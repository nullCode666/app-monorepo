import { useNavigation } from 'expo-router';
import { useEffect, useMemo } from 'react';

import { AnimatedSection, ScrollView, useTheme } from '@/core/components';
import { Check } from '@/core/components/icons';
import { CURRENCY_OPTIONS } from '@/core/constants/settings';
import { settingsActions, useSettingsStore } from '@/core/stores/settings';

export default function CurrencyPreferenceScreen() {
  const navigation = useNavigation();
  const theme = useTheme();

  const currency = useSettingsStore(state => state.currency);

  const backgroundColor = theme.backgroundModal.val;
  const contentContainerStyle = useMemo(() => ({
    paddingTop: 70,
    paddingHorizontal: 20,
    paddingBottom: 24,
    gap: 24,
  }), []);

  useEffect(() => {
    navigation.setOptions({
      title: '法币显示',
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
        {CURRENCY_OPTIONS.map(option => {
          const isSelected = option.value === currency;

          return (
            <AnimatedSection.Item
              key={option.value}
              title={option.label}
              trailing={isSelected ? <Check size={18} color='$primary' /> : <></>}
              onPress={() => {
                settingsActions.setCurrency(option.value);
                navigation.goBack();
              }}
            />
          );
        })}
      </AnimatedSection.Container>
    </ScrollView>
  );
}
