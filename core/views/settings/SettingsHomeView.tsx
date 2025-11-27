import { useNavigation } from 'expo-router';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import {
  AnimatedSection,
  Avatar,
  Button,
  ScrollView,
  SheetHost,
  Typography,
  XStack,
  YStack,
  useSheetController,
  useTheme,
} from '@/core/components';
import RVSwitch from '@/core/components/Form/Switch';
import { ArrowUpRight, ChevronRight, Headset, Lock } from '@/core/components/icons';
import {
  APP_BUILD_NUMBER,
  APP_VERSION,
  CHANGELOG,
  GITHUB_APP_REPO,
  PRIVACY_POLICY,
  REVIEW_REPORT,
  WEBSITE_HOMEPAGE,
  XDOTCOM_OFFICIAL,
} from '@/core/config';
import { useNavigationHeaderStyle } from '@/core/hooks/navigation';
import { openLink } from '@/core/utils';

import type { ParamListBase } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

const ROW_HEIGHT = AnimatedSection.ROW_HEIGHT;
const DIVIDER_HEIGHT = AnimatedSection.DIVIDER_HEIGHT;

const QUICK_ACTIONS = [
  { id: 'accounts', label: '管理账户', onPress: () => openLink('/device') },
  { id: 'contacts', label: '管理联系人', onPress: () => openLink('/contact') },
] as const;

const BASIC_ACTIONS = [
  { id: 'preferences', label: '偏好设置', onPress: () => openLink('/settings/preferences'), trailing: undefined },
  { id: 'clear', label: '清除本地缓存数据', onPress: undefined, trailing: undefined },
] as const;

const APP_INFO_ACTIONS = [
  { id: 'version', label: '应用版本', onPress: undefined, trailing: undefined },
  { id: 'updates', label: '检查更新', onPress: () => openLink(CHANGELOG), trailing: undefined },
  {
    id: 'policies',
    label: '服务条款与隐私政策',
    onPress: () => openLink(PRIVACY_POLICY),
    trailing: <ArrowUpRight size={18} color='$color10' />,
  },
] as const;

const WEB_LINK_ROWS = [
  { id: 'website', label: '官网', href: WEBSITE_HOMEPAGE },
  { id: 'social', label: '社交媒体', href: XDOTCOM_OFFICIAL },
  { id: 'code', label: '开源代码', href: GITHUB_APP_REPO },
  { id: 'audit', label: '审计报告', href: REVIEW_REPORT },
] as const;

export function SettingsHomeView() {
  const theme = useTheme();
  const { bottom } = useSafeAreaInsets();
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
  const sheet = useSheetController();
  const navigationHeaderStyle = useNavigationHeaderStyle(true);

  const [biometricsEnabled, setBiometricsEnabled] = useState(true);
  const [autoAddContacts, setAutoAddContacts] = useState(true);

  const handleBiometricsChange = useCallback((value: boolean) => {
    setBiometricsEnabled(value);
  }, []);

  const handleAutoAddContactsChange = useCallback((value: boolean) => {
    setAutoAddContacts(value);
  }, []);

  const handleClearCache = useCallback(() => {
    sheet.present({
      title: '清除缓存数据',
      description: '清除缓存数据将会清空本地待完成的交易',
      children: (
        <YStack gap='$4' px='$4' pb='$2' pt='$2'>
          <Button type='primary' onPress={() => sheet.dismiss()}>
            清理
          </Button>
        </YStack>
      ),
      modal: false,
      hostName: 'settings-screen-sheet',
      snapPoints: [40],
      showCloseButton: true,
      wrapContent: true,
      scrollViewProps: null,
    });
  }, [sheet]);

  const backgroundColor = theme.backgroundModal.val;
  const scrollViewProps = useMemo(() => {
    return {
      style: {
        flex: 1,
        backgroundColor,
      },
      contentContainerStyle: {
        paddingBottom: bottom + 24,
        paddingHorizontal: 20,
        gap: 24,
      },
    };
  }, [backgroundColor, bottom]);

  useEffect(() => {
    const navigationOptions = {
      title: '设置',
      headerTransparent: true,
      headerShadowVisible: false,
      headerStyle: { backgroundColor: 'transparent' },
      headerRight: () =>
        autoAddContacts && biometricsEnabled ? (
          <XStack width={36} height={36} justifyContent='center' alignItems='center'>
            <Lock size={24} color='$color' />
          </XStack>
        ) : null,
      ...navigationHeaderStyle,
    };

    navigation.setOptions(navigationOptions);
  }, [autoAddContacts, biometricsEnabled, navigation, navigationHeaderStyle]);

  const collapsibleHeight = useMemo(() => ROW_HEIGHT * 2 + DIVIDER_HEIGHT * 2, []);

  return (
    <SheetHost name='settings-screen-sheet'>
      <ScrollView
        {...scrollViewProps}
        keyboardShouldPersistTaps='handled'
        showsVerticalScrollIndicator={false}
        contentInsetAdjustmentBehavior='automatic'
        scrollIndicatorInsets={{ top: 12, bottom: 0, left: 0, right: 0 }}
        scrollEventThrottle={16}
      >
        <YStack gap='$6' pt='$4'>
          <SupportCard />

          <AnimatedSection.Container description='设置常用联系人，可以有效避免转账时输入错误地址'>
            {QUICK_ACTIONS.map((action) => (
              <AnimatedSection.Item key={action.id} title={action.label} onPress={action.onPress} />
            ))}
          </AnimatedSection.Container>

          <AnimatedSection.Container animate>
            <AnimatedSection.Item
              title='启用面容识别'
              trailing={<RVSwitch value={biometricsEnabled} onValueChange={handleBiometricsChange} />}
            />
            <AnimatedSection.Collapsible open={biometricsEnabled} height={collapsibleHeight}>
              <AnimatedSection.Item
                title='每次启动前需面容识别'
                trailing={<RVSwitch value={autoAddContacts} onValueChange={handleAutoAddContactsChange} />}
              />
              <AnimatedSection.Item title='安全与防护' onPress={() => openLink('/settings/security')} />
            </AnimatedSection.Collapsible>
          </AnimatedSection.Container>

          <AnimatedSection.Container>
            {BASIC_ACTIONS.map((action) => (
              <AnimatedSection.Item
                key={action.id}
                title={action.label}
                trailing={action.trailing}
                onPress={action.id === 'clear' ? handleClearCache : action.onPress}
              />
            ))}
          </AnimatedSection.Container>

          <AnimatedSection.Container>
            {APP_INFO_ACTIONS.map((action) => (
              <AnimatedSection.Item
                key={action.id}
                title={action.label}
                trailing={
                  action.id === 'version' ? (
                    <Typography.Text fontSize={15}>
                      {`${APP_VERSION ?? ''}${APP_BUILD_NUMBER ? ` - ${APP_BUILD_NUMBER}` : ''}`}
                    </Typography.Text>
                  ) : (
                    action.trailing
                  )
                }
                onPress={action.onPress}
              />
            ))}
          </AnimatedSection.Container>

          <AnimatedSection.Container>
            {WEB_LINK_ROWS.map((link) => (
              <AnimatedSection.Item
                key={link.id}
                title={link.label}
                trailing={<ArrowUpRight size={18} color='$color10' />}
                onPress={() => openLink(link.href)}
              />
            ))}
          </AnimatedSection.Container>
        </YStack>
      </ScrollView>
    </SheetHost>
  );
}

const SupportCard = () => (
  <YStack pt='$2'>
    <XStack
      borderRadius={20}
      height={56 + 18 * 2}
      backgroundColor='$background2'
      padding='$4'
      gap='$4'
      alignItems='center'
    >
      <Avatar.Token type='primary' media={Headset} size='small' />
      <YStack flex={1} justifyContent='center' gap='$2'>
        <Typography.TextPrimary>需要协助？联系在线客服</Typography.TextPrimary>
        <YStack gap='$1'>
          <Typography.TextSecondary fontSize={12}>· 7 x 24 专业技术支持，极速响应</Typography.TextSecondary>
          <Typography.TextSecondary fontSize={12}>· 一站式服务，安全便捷</Typography.TextSecondary>
        </YStack>
      </YStack>
      <ChevronRight size={20} color='$color10' alignSelf='center' />
    </XStack>
  </YStack>
);
