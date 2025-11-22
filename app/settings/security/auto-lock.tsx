import { useNavigation } from 'expo-router';
import { useEffect, useMemo } from 'react';
import { StyleSheet } from 'react-native';

import { AnimatedSection, ScrollView, useTheme } from '@/core/components';
import { Check } from '@/core/components/icons';
import { AUTO_LOCK_OPTIONS } from '@/core/constants/settings';
import { settingsActions, useSettingsStore } from '@/core/stores/settings';

export default function AutoLockScreen() {
  const navigation = useNavigation();
  const theme = useTheme();

  const autoLockDuration = useSettingsStore((state) => state.autoLockDuration);

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
      title: '自动锁定时间',
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
        {AUTO_LOCK_OPTIONS.map((option) => {
          const isSelected = option.value === autoLockDuration;

          return (
            <AnimatedSection.Item
              key={option.value}
              title={option.label}
              trailing={isSelected ? <Check size={18} color='$primary' /> : <></>}
              onPress={() => {
                settingsActions.setAutoLockDuration(option.value);
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
