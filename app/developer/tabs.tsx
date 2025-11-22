import { StyleSheet } from 'react-native';

import { Tabs, Typography, YStack } from '@/core/components';
import { DemoPage, DemoSection } from '@/core/views/developer/DemoComponents';

const TAB_CONTENT = [
  { name: 'overview', label: 'Overview', body: 'High-level snapshot of your portfolio.' },
  { name: 'positions', label: 'Positions', body: 'Every position with live updates.' },
  { name: 'activity', label: 'Activity', body: 'Chronological history across accounts.' },
];

export default function TabsScreen() {
  return (
    <DemoPage>
      <DemoSection
        title='Tabs.Container'
        description='Our wrapper preconfigures the material tab bar to match the design tokens.'
      >
        <YStack height={260} overflow='hidden'>
          <Tabs.Container>
            {TAB_CONTENT.map((tab) => (
              <Tabs.Tab key={tab.name} name={tab.name} label={tab.label}>
                <Tabs.ScrollView contentContainerStyle={styles.contentContainer} showsVerticalScrollIndicator={false}>
                  <Typography.TextPrimary fontSize={18}>{tab.label}</Typography.TextPrimary>
                  <Typography.TextSecondary>{tab.body}</Typography.TextSecondary>
                </Tabs.ScrollView>
              </Tabs.Tab>
            ))}
          </Tabs.Container>
        </YStack>
      </DemoSection>
    </DemoPage>
  );
}

const styles = StyleSheet.create({
  contentContainer: { padding: 16, gap: 8 },
});
