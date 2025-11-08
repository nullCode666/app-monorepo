import { Button, Typography, XStack, YStack } from '@/core/components';
import { Check, Settings } from '@/core/components/icons';
import { DemoPage, DemoSection } from '@/core/views/developer/DemoComponents';

export default function ButtonScreen() {
  return (
    <DemoPage>
      <DemoSection title='Contained Buttons' description='Default Tamagui button variants themed with our palette.'>
        <XStack gap='$3' flexWrap='wrap'>
          <Button onPress={() => { }}>Default</Button>
          <Button theme='active'>Active</Button>
          <Button theme='blue'>Blue Theme</Button>
          <Button theme='red' icon={Check}>
            With Icon
          </Button>
        </XStack>
      </DemoSection>

      <DemoSection title='Outlined & Chromeless' description='Using `variant` and `chromeless` to change button treatment.'>
        <XStack gap='$3' flexWrap='wrap'>
          <Button variant='outlined'>Outlined</Button>
          <Button variant='outlined' theme='green' icon={Settings}>
            Outlined Icon
          </Button>
          <Button chromeless>Chromeless</Button>
          <Button chromeless theme='purple'>
            Chromeless Accent
          </Button>
        </XStack>
      </DemoSection>

      <DemoSection title='Sizes & States'>
        <YStack gap='$2'>
          <XStack gap='$3' alignItems='center'>
            <Typography.TextSecondary width={120}>Size Examples</Typography.TextSecondary>
            <XStack gap='$2'>
              <Button size='$2'>S</Button>
              <Button size='$3'>M</Button>
              <Button size='$4'>L</Button>
            </XStack>
          </XStack>
          <XStack gap='$3' alignItems='center'>
            <Typography.TextSecondary width={120}>Disabled</Typography.TextSecondary>
            <Button disabled>Disabled</Button>
          </XStack>
        </YStack>
      </DemoSection>
    </DemoPage>
  );
}
