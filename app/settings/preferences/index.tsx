import { useNavigation } from 'expo-router';
import { useEffect, useMemo } from 'react';

import { AnimatedSection, ScrollView, Typography, XStack, useTheme } from '@/core/components';
import { ChevronRight } from '@/core/components/icons';
import { getCurrencyLabel, getLanguageLabel } from '@/core/constants/settings';
import { useSettingsStore } from '@/core/stores/settings';
import { openLink } from '@/core/utils';

const VALUE_TRAILING = (value: string) => (
  <XStack alignItems='center' gap='$2'>
    <Typography.TextSecondary numberOfLines={1}>{value}</Typography.TextSecondary>
    <ChevronRight size={18} color='$color10' />
  </XStack>
);

export default function PreferencesScreen() {
  const navigation = useNavigation();
  const theme = useTheme();

  const language = useSettingsStore(state => state.language);
  const currency = useSettingsStore(state => state.currency);

  const backgroundColor = theme.backgroundModal.val;
  const contentContainerStyle = useMemo(() => ({
    paddingTop: 70,
    paddingBottom: 24,
    paddingHorizontal: 16,
    gap: 24,
  }), []);

  useEffect(() => {
    navigation.setOptions({
      title: '偏好设置',
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
          title='界面语言'
          trailing={VALUE_TRAILING(getLanguageLabel(language))}
          onPress={() => openLink('/settings/preferences/language')}
        />
        <AnimatedSection.Item
          title='法币显示'
          trailing={VALUE_TRAILING(getCurrencyLabel(currency))}
          onPress={() => openLink('/settings/preferences/currency')}
        />
      </AnimatedSection.Container>
    </ScrollView>
  );
}
