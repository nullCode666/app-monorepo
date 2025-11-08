// SettingsScreen.tsx
import { useNavigation } from 'expo-router';
import { AnimatePresence, MotiView } from 'moti';
import { useCallback, useEffect, useMemo, useState, type ReactNode } from 'react';
import { ScrollView } from 'react-native';
import Animated, {
  Easing,
  FadeIn,
  FadeOut,
} from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme } from 'tamagui';

import {
  Avatar,
  Pressable,
  Typography,
  View,
  XStack,
  YStack,
} from '@/core/components';
import RVSwitch from '@/core/components/Form/Switch';
import {
  ChevronRight,
  FileCheck2,
  Github,
  Headset,
  Lock,
  X,
} from '@/core/components/icons';
import {
  APP_BUILD_NUMBER,
  APP_VERSION,
  CHANGELOG,
  GITHUB_APP_REPO,
  PRIVACY_POLICY,
  REVIEW_REPORT,
  USER_AGREEMENT,
  WEBSITE_HOMEPAGE,
  XDOTCOM_OFFICIAL,
} from '@/core/config';
import { openLink } from '@/core/utils';

import type { ParamListBase } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

// ============ 常量 ============
const ROW_H = 48;
const DIVIDER_H = 1;          // 你在 Divider 里是 1
const EXTRA = DIVIDER_H * 2;  // “开关行”下方会出现 2 条 divider
const OPEN_SPACE = ROW_H * 2 + EXTRA; // 96 + 2 = 98

// 顶部“开关行”的淡显（保持你的设定）
const topRowEnter = FadeIn.duration(0).easing(Easing.linear);
const topRowExit = FadeOut.duration(0).easing(Easing.linear);

// ------------------------------------

const ACTION_ITEMS = [
  { Icon: X, label: '官网', href: WEBSITE_HOMEPAGE },
  { Icon: X, label: '社交媒体', href: XDOTCOM_OFFICIAL },
  { Icon: Github, label: '开源代码', href: GITHUB_APP_REPO },
  { Icon: FileCheck2, label: '审计报告', href: REVIEW_REPORT },
] as const;

type ListSectionProps = {
  description?: string;
  children: ReactNode;
  animateLayout?: boolean;
};

const ListSection = ({ description, children, animateLayout = false }: ListSectionProps) => {
  const content = (
    <YStack gap='$2' width='100%'>
      <YStack
        borderRadius={18}
        backgroundColor='$background2'
        overflow='hidden'
        borderWidth={1}
        borderColor='transparent'
      >
        {children}
      </YStack>
      {!!description && (
        <Typography.TextSecondary fontSize={12}>{description}</Typography.TextSecondary>
      )}
    </YStack>
  );

  if (!animateLayout) {
    return content;
  }

  return (
    <MotiView
      transition={{ type: 'timing', duration: 220 }}
      style={{ width: '100%' }}
    >
      {content}
    </MotiView>
  );
};

type ActionRowProps = {
  label: string;
  description?: string;
  icon?: ReactNode;
  onPress?: () => void;
};

const ActionRow = ({ label, icon, onPress }: ActionRowProps) => (
  <Pressable onPress={onPress} disabled={!onPress}>
    {() => (
      <XStack
        height={ROW_H}
        paddingHorizontal='$4'
        alignItems='center'
        justifyContent='space-between'
        backgroundColor='transparent'
      >
        <YStack flex={1}>
          <Typography.Text fontSize={15}>
            {label}
          </Typography.Text>
        </YStack>
        {icon ?? <ChevronRight size={20} color='$color10' />}
      </XStack>
    )}
  </Pressable>
);

const SupportCard = () => (
  <YStack pt='$2'>
    <XStack
      borderRadius={20}
      height={56 + 18 * 2}
      backgroundColor='$background2'
      padding='$4'
      gap='$4'
    >
      <Avatar.Token type='primary' media={Headset} size='default' />
      <YStack flex={1} justifyContent='center' gap='$2'>
        <Typography.TextPrimary>
          需要协助？联系在线客服
        </Typography.TextPrimary>
        <YStack gap='$1'>
          <Typography.TextSecondary fontSize={12}>
            · 7 x 24 专业技术支持，极速响应
          </Typography.TextSecondary>
          <Typography.TextSecondary fontSize={12}>
            · 一站式服务，安全便捷
          </Typography.TextSecondary>
        </YStack>
      </YStack>
      <ChevronRight size={20} color='$color10' alignSelf='center' />
    </XStack>
  </YStack>
);

const VersionFooter = () => (
  <YStack pt='$2' gap='$4'>
    <XStack justifyContent='space-between' alignItems='center'>
      {ACTION_ITEMS.map(({ Icon, label, href }) => (
        <Avatar.Token key={label} label={label} link={href} media={Icon} size='default' />
      ))}
    </XStack>
    <YStack alignItems='center' gap='$2' pt='$2'>
      <Typography.Text>
        {APP_VERSION} - {APP_BUILD_NUMBER}
      </Typography.Text>
    </YStack>
    <XStack gap='$3' alignItems='center' justifyContent='center'>
      <Typography.TextSecondary onPress={() => openLink(CHANGELOG)}>更新记录</Typography.TextSecondary>
      <Typography.TextSecondary onPress={() => openLink(USER_AGREEMENT)}>服务条款</Typography.TextSecondary>
      <Typography.TextSecondary onPress={() => openLink(PRIVACY_POLICY)}>隐私政策</Typography.TextSecondary>
    </XStack>
  </YStack>
);

const Divider = () => (
  <View height={DIVIDER_H} bg='$color6' opacity={0.8} marginHorizontal='$4' />
);

const SettingsScreen = () => {
  const theme = useTheme();
  const { bottom } = useSafeAreaInsets();
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();

  const [biometricsEnabled, setBiometricsEnabled] = useState(true);
  const [autoAddContacts, setAutoAddContacts] = useState(true);

  const handleBiometricsChange = useCallback((value: boolean) => {
    setBiometricsEnabled(value);
  }, []);

  const handleAutoAddContactsChange = useCallback((value: boolean) => {
    setAutoAddContacts(value);
  }, []);

  const backgroundColor = theme.background.val;
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
    navigation.setOptions({
      title: '设置',
      headerTransparent: true,
      headerShadowVisible: false,
      headerStyle: { backgroundColor: 'transparent' },
      headerSearchBarOptions: {
        placeholder: '搜索设置',
      },
      headerRight: () =>
        (autoAddContacts && biometricsEnabled) ? (
          <XStack width={36} height={36} justifyContent='center' alignItems='center'>
            <Lock size={24} color='$color' />
          </XStack>
        ) : null,
    });
  }, [autoAddContacts, biometricsEnabled, navigation]);

  return (
    <ScrollView
      {...scrollViewProps}
      keyboardShouldPersistTaps='handled'
      showsVerticalScrollIndicator={false}
      contentInsetAdjustmentBehavior='automatic'
      scrollIndicatorInsets={{ top: 12, bottom: 0, left: 0, right: 0 }}
      scrollEventThrottle={16}
    >
      <YStack gap='$6'>
        <SupportCard />

        <ListSection description='设置常用联系人，可以有效避免转账时输入错误地址'>
          <ActionRow label='联系人管理' onPress={() => openLink('/contact')} />
        </ListSection>

        {/* 生物识别分组（父容器不做布局动画） */}
        <ListSection>
          {/* 顶部开关行 */}
          <Animated.View entering={topRowEnter} exiting={topRowExit}>
            <ActionRow
              label='启用面容识别'
              icon={<RVSwitch value={biometricsEnabled} onValueChange={handleBiometricsChange} />}
            />
          </Animated.View>

          {/* —— 关键：用“Spacer + 绝对定位内容” —— */}
          <View position='relative'>
            {/* 1) Spacer：仅负责推开下面的内容（height: 0 → 98） */}
            <MotiView
              from={{ height: 0 }}
              animate={{ height: biometricsEnabled ? OPEN_SPACE : 0 }}
              transition={{ type: 'timing', duration: 260, easing: Easing.linear }}
              style={{ width: '100%' }}
            />

            {/* 2) 内容层：叠在 Spacer 上方，做从右到左 + opacity 的入场/退场 */}
            <AnimatePresence>
              {biometricsEnabled && (
                <View
                  position='absolute'
                  left={0}
                  right={0}
                  top={0}
                >
                  <Divider />

                  {/* 行 1（错峰 40ms） */}
                  <MotiView
                    from={{ opacity: 0, translateX: 24 }}
                    animate={{ opacity: 1, translateX: 0 }}
                    exit={{ opacity: 0, translateX: 24 }}
                    transition={{
                      type: 'timing',
                      duration: 220,
                      easing: Easing.out(Easing.cubic),
                      delay: 40,
                    }}
                  >
                    <ActionRow
                      label='每次启动前需面容识别'
                      icon={<RVSwitch value={autoAddContacts} onValueChange={handleAutoAddContactsChange} />}
                    />
                  </MotiView>

                  <Divider />

                  {/* 行 2（错峰 80ms） */}
                  <MotiView
                    from={{ opacity: 0, translateX: 24 }}
                    animate={{ opacity: 1, translateX: 0 }}
                    exit={{ opacity: 0, translateX: 24 }}
                    transition={{
                      type: 'timing',
                      duration: 220,
                      easing: Easing.out(Easing.cubic),
                      delay: 80,
                    }}
                  >
                    <ActionRow label='安全与防护' onPress={() => openLink('/contact')} />
                  </MotiView>
                </View>
              )}
            </AnimatePresence>
          </View>
        </ListSection>

        {/* 下面这些会被 Spacer 推开（真实占位），自然下移 */}
        <ListSection>
          <ActionRow label='通用' />
          <Divider />
          <ActionRow label='清除本地缓存数据' />
          <Divider />
          <ActionRow label='检查更新' />
        </ListSection>

        <VersionFooter />
      </YStack>
    </ScrollView>
  );
};

export default SettingsScreen;
