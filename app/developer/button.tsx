import { Button, Typography, XStack, YStack } from '@/core/components';
import { Check, Settings } from '@/core/components/icons';
import { DemoPage, DemoSection } from '@/core/views/developer/DemoComponents';

export default function ButtonScreen() {
  return (
    <DemoPage>
      <DemoSection title='Contained Buttons' description='Default Tamagui button variants themed with our palette.'>
        <XStack gap='$3' flexWrap='wrap'>
          <Button>Default</Button>
          <Button type='primary'>Primary</Button>
          <Button type='dashed'>Dashed</Button>
          <Button type='primary' danger icon={Check}>
            Danger Primary
          </Button>
          <Button danger icon={Check}>
            Danger Default
          </Button>
        </XStack>
      </DemoSection>

      <DemoSection title='Text & Link' description='Using `type="text"` and `type="link"`.'>
        <XStack gap='$3' flexWrap='wrap'>
          <Button type='text'>Text Button</Button>
          <Button type='link' icon={Settings}>
            Link Button
          </Button>
          <Button type='text' danger>
            Text Danger
          </Button>
        </XStack>
      </DemoSection>

      <DemoSection title='Sizes & States'>
        <YStack gap='$2'>
          <XStack gap='$3' alignItems='center'>
            <Typography.TextSecondary width={120}>Size Examples</Typography.TextSecondary>
            <XStack gap='$2' alignItems='center'>
              <Button size='small'>Small</Button>
              <Button size='middle'>Middle</Button>
              <Button size='large'>Large</Button>
            </XStack>
          </XStack>
          <XStack gap='$3' alignItems='center'>
            <Typography.TextSecondary width={120}>Loading</Typography.TextSecondary>
            <Button loading>Loading</Button>
            <Button type='primary' loading>
              Loading
            </Button>
          </XStack>
          <XStack gap='$3' alignItems='center'>
            <Typography.TextSecondary width={120}>Disabled</Typography.TextSecondary>
            <Button disabled>Disabled</Button>
            <Button type='primary' disabled>
              Disabled
            </Button>
          </XStack>
        </YStack>
      </DemoSection>
    </DemoPage>
  );
}
