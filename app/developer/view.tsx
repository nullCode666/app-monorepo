import { Typography, View } from '@/core/components';
import { DemoPage, DemoSection } from '@/core/views/developer/DemoComponents';

export default function ViewScreen() {
  return (
    <DemoPage>
      <DemoSection title='Layout Props'>
        <View
          width='100%'
          height={140}
          borderRadius='$4'
          borderWidth={1}
          borderColor='$color5'
          backgroundColor='$backgroundPress'
          padding='$4'
        >
          <Typography.Text>View inherits all Tamagui layout shorthands.</Typography.Text>
          <Typography.TextSecondary marginTop='$2'>
            Use it when you need a styled container without ergonomic flex helpers from `XStack` or `YStack`.
          </Typography.TextSecondary>
        </View>
      </DemoSection>

      <DemoSection title='Overlay Example'>
        <View height={160} borderRadius='$4' backgroundColor='$color5' overflow='hidden'>
          <View position='absolute' top={0} left={0} right={0} bottom={0} backgroundColor='rgba(0,0,0,0.1)' />
          <View flex={1} alignItems='center' justifyContent='center'>
            <Typography.TextPrimary color='$color'>Overlay Layer</Typography.TextPrimary>
          </View>
        </View>
      </DemoSection>
    </DemoPage>
  );
}
