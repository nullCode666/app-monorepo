import { useNavigation } from 'expo-router';
import { useEffect, useMemo } from 'react';
import { StyleSheet } from 'react-native';

import { AnimatedSection, ScrollView, useTheme } from '@/core/components';
import { Check } from '@/core/components/icons';
import { LANGUAGE_OPTIONS } from '@/core/constants/settings';
import { settingsActions, useSettingsStore } from '@/core/stores/settings';

export default function LanguagePreferenceScreen() {
  const navigation = useNavigation();
  const theme = useTheme();

  const language = useSettingsStore((state) => state.language);

  const backgroundColor = theme.backgroundModal.val;
  const contentContainerStyle = useMemo(
    () => ({
      paddingTop: 70,
      paddingHorizontal: 20,
      paddingBottom: 24,
      gap: 24,
    }),
    [],
  );

  useEffect(() => {
    navigation.setOptions({
      title: '界面语言',
      headerTransparent: true,
      headerShadowVisible: false,
      headerStyle: { backgroundColor: 'transparent' },
    });
  }, [navigation]);

  return (
    <ScrollView
      style={[styles.container, { backgroundColor }]}
      contentContainerStyle={contentContainerStyle}
      keyboardShouldPersistTaps='handled'
      showsVerticalScrollIndicator={false}
    >
      <AnimatedSection.Container>
        {LANGUAGE_OPTIONS.map((option) => {
          const isSelected = option.value === language;

          return (
            <AnimatedSection.Item
              key={option.value}
              title={option.label}
              trailing={isSelected ? <Check size={18} color='$primary' /> : <></>}
              onPress={() => {
                settingsActions.setLanguage(option.value);
                navigation.goBack();
              }}
            />
          );
        })}
      </AnimatedSection.Container>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
});
