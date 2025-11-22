import { Typography, XStack, YStack } from '@/core/components';
import { DemoPage, DemoSection } from '@/core/views/developer/DemoComponents';

export default function TypographyScreen() {
  return (
    <DemoPage>
      <DemoSection title='Number Styles'>
        <YStack gap='$2'>
          <Typography.NumberHeading>$888,888.88</Typography.NumberHeading>
          <Typography.NumberPrimary>$88,888.88</Typography.NumberPrimary>
          <Typography.Number>$8,888.88</Typography.Number>
          <Typography.NumberSecondary>$888.88</Typography.NumberSecondary>
        </YStack>
      </DemoSection>

      <DemoSection
        title='Percentage & Value Helpers'
        description='The helper props add automatic coloring, sign prefixes, and optional brackets.'
      >
        <YStack gap='$2'>
          <XStack gap='$2' alignItems='center'>
            <Typography.TextSecondary width={160}>Percentage Gain</Typography.TextSecondary>
            <Typography.NumberSecondary percentageChange={3.42} />
          </XStack>
          <XStack gap='$2' alignItems='center'>
            <Typography.TextSecondary width={160}>Percentage Loss (brackets)</Typography.TextSecondary>
            <Typography.NumberSecondary percentageChange={-1.71} wrapInBrackets />
          </XStack>
          <XStack gap='$2' alignItems='center'>
            <Typography.TextSecondary width={160}>Value Change</Typography.TextSecondary>
            <Typography.NumberSecondary valueChange={2450.23} />
          </XStack>
          <XStack gap='$2' alignItems='center'>
            <Typography.TextSecondary width={160}>Value Loss (brackets)</Typography.TextSecondary>
            <Typography.NumberSecondary valueChange={-512.11} wrapInBrackets />
          </XStack>
        </YStack>
      </DemoSection>

      <DemoSection title='Text Styles'>
        <YStack gap='$2'>
          <Typography.TextHeading>Heading text</Typography.TextHeading>
          <Typography.TextPrimary>Primary text weight</Typography.TextPrimary>
          <Typography.Text>Body text</Typography.Text>
          <Typography.TextSecondary>Secondary caption text</Typography.TextSecondary>
        </YStack>
      </DemoSection>
    </DemoPage>
  );
}
