import { ReactNode } from 'react';
import { ScrollView } from 'react-native';

import { Typography, YStack } from '@/core/components';

type DemoPageProps = {
  children: ReactNode;
};

type DemoSectionProps = {
  title: string;
  description?: string;
  children: ReactNode;
};

export function DemoPage({ children }: DemoPageProps) {
  return (
    <ScrollView
      contentContainerStyle={{
        paddingVertical: 16,
        gap: 24,
      }}
      contentInsetAdjustmentBehavior='automatic'
      showsVerticalScrollIndicator={false}
    >
      {children}
    </ScrollView>
  );
}

export function DemoSection({ title, description, children }: DemoSectionProps) {
  return (
    <YStack gap='$1' py='$4'>
      <YStack gap='$1' py='$2' px='$4'>
        <Typography.TextPrimary>{title}</Typography.TextPrimary>
        {description ? (
          <Typography.TextSecondary>{description}</Typography.TextSecondary>
        ) : null}
      </YStack>
      <YStack
        gap='$2'
        padding='$2'
      >
        {children}
      </YStack>
    </YStack>
  );
}


