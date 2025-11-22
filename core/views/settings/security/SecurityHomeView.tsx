import { useNavigation } from 'expo-router';
import { useEffect, useMemo } from 'react';
import { Alert } from 'react-native';

import { AnimatedSection, Form, ScrollView, Typography, XStack, useTheme } from '@/core/components';
import { ArrowUpRight, ChevronRight } from '@/core/components/icons';
import { getAutoLockLabel } from '@/core/constants/settings';
import { settingsActions, useSettingsStore } from '@/core/stores/settings';
import { openLink } from '@/core/utils';

const VALUE_TRAILING = (value: string) => (
  <XStack alignItems='center' gap='$2'>
    <Typography.TextSecondary numberOfLines={1}>{value}</Typography.TextSecondary>
    <ChevronRight size={18} color='$color10' />
  </XStack>
);

const LOG_ACTIONS = [
  { id: 'download', label: '下载 APP 日志', onPress: () => openLink('https://revault.one/support/logs'), trailing: <ArrowUpRight size={18} color='$color10' /> },
] as const;

export function SecurityHomeView() {
  const navigation = useNavigation();
  const theme = useTheme();

  const autoLockDuration = useSettingsStore(state => state.autoLockDuration);
  const shareUsageData = useSettingsStore(state => state.shareUsageData);

  const backgroundColor = theme.backgroundModal.val;
  const contentContainerStyle = useMemo(() => ({
    paddingTop: 70,
    paddingHorizontal: 20,
    paddingBottom: 24,
    gap: 24,
  }), []);

  useEffect(() => {
    navigation.setOptions({
      title: '安全性与隐私',
      headerTransparent: true,
      headerShadowVisible: false,
      headerStyle: { backgroundColor: 'transparent' },
    });
  }, [navigation]);

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor }}
      contentContainerStyle={contentContainerStyle}
      keyboardShouldPersistTaps='handled'
      showsVerticalScrollIndicator={false}
    >
      <AnimatedSection.Container>
        <AnimatedSection.Item
          title='自动锁定时间'
          trailing={VALUE_TRAILING(getAutoLockLabel(autoLockDuration))}
          onPress={() => openLink('/settings/security/auto-lock')}
        />
      </AnimatedSection.Container>

      <AnimatedSection.Container>
        {LOG_ACTIONS.map(action => (
          <AnimatedSection.Item
            key={action.id}
            title={action.label}
            trailing={action.trailing ?? <ChevronRight size={18} color='$color10' />}
            onPress={action.onPress}
          />
        ))}
      </AnimatedSection.Container>

      <AnimatedSection.Container>
        <AnimatedSection.Item
          title='分享使用数据'
          trailing={<Form.Switch value={shareUsageData} onValueChange={value => settingsActions.setShareUsageData(value)} />}
        />
      </AnimatedSection.Container>

      <AnimatedSection.Container>
        <AnimatedSection.Item
          title={(
            <Typography.Text color='$red10' fontSize={15} numberOfLines={1}>重置 APP</Typography.Text>
          )}
          trailing={null}
          onPress={() => {
            Alert.alert(
              '重置 APP',
              '这将清除所有本地配置，是否继续？',
              [
                { text: '取消', style: 'cancel' },
                {
                  text: '重置',
                  style: 'destructive',
                  onPress: () => settingsActions.resetApp(),
                },
              ],
            );
          }}
        />
      </AnimatedSection.Container>
    </ScrollView>
  );
}

