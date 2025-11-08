import { useState } from 'react';

import { Pressable, Typography, View, XStack, YStack } from '@/core/components';
import { DemoPage, DemoSection } from '@/core/views/developer/DemoComponents';

export default function PressableScreen() {
  const [counter, setCounter] = useState(0);

  return (
    <DemoPage>
      <DemoSection
        title='Animated Feedback'
        description='`Pressable` is a wrapper around `moti` interactions that handles press feedback for you.'
      >
        <Pressable
          onPress={() => setCounter((current) => current + 1)}
          style={{ alignSelf: 'flex-start' }}
          animate={({ pressed }) => ({ scale: pressed ? 0.96 : 1 })}
        >
          <YStack
            padding='$4'
            borderRadius='$5'
            backgroundColor='$background'
            borderColor='$color5'
            borderWidth={1}
            gap='$2'
          >
            <Typography.TextPrimary>Tap Me</Typography.TextPrimary>
            <Typography.TextSecondary>
              Taps recorded: <Typography.NumberSecondary>{counter}</Typography.NumberSecondary>
            </Typography.TextSecondary>
          </YStack>
        </Pressable>
      </DemoSection>

      <DemoSection
        title='Custom States'
        description='Combine press events with our stack components to build richer interactions.'
      >
        <XStack gap='$3'>
          <Pressable
            animate={({ pressed }) => ({ opacity: pressed ? 0.6 : 1 })}
            style={{ borderRadius: 16 }}
          >
            <View
              width={120}
              height={80}
              borderRadius={16}
              backgroundColor='$backgroundPress'
              alignItems='center'
              justifyContent='center'
            >
              <Typography.TextSecondary>Opacity</Typography.TextSecondary>
            </View>
          </Pressable>
          <Pressable
            animate={({ pressed }) => ({ rotate: pressed ? '3deg' : '0deg' })}
            style={{ borderRadius: 16 }}
          >
            <View
              width={120}
              height={80}
              borderRadius={16}
              backgroundColor='$backgroundPress'
              alignItems='center'
              justifyContent='center'
            >
              <Typography.TextSecondary>Rotate</Typography.TextSecondary>
            </View>
          </Pressable>
        </XStack>
      </DemoSection>
    </DemoPage>
  );
}
