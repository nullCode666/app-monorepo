import { Pressable, Typography, View, XStack, YStack } from '@/core/components';
import { GradientHeader } from '@/core/views/header/GradientHeader';
import { useState } from 'react';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';
import { ExploreInput } from './ExploreInput';
import { ModeSwitch } from './ModeSwitch';

const suggestions = [
  { icon: '🪂', text: '有哪些需要我参与的空投赚取项目?' },
  { icon: '🛡️', text: '我是否开启了所有安全配置？' },
  { icon: '🤝', text: '寻找安全且适合交互的项目' },
];

export function ExploreHomeView() {
  const [mode, setMode] = useState<'google' | 'ai'>('ai');
  const isAiMode = mode === 'ai';

  const toggleMode = () => {
    setMode((prev) => (prev === 'google' ? 'ai' : 'google'));
  };
  return (
    <GradientHeader
      title='Explore'
      gradientColor={['#B35635', '#8E3840', '#763A57']}
      gradientStart={{ x: 0, y: 0 }}
      gradientEnd={{ x: 1, y: 0 }}
      maskBottom
      rightItem={null}
    >
      <YStack flex={1} backgroundColor='transparent' justifyContent='center' pb='$12'>
        <ExploreInput isAiMode={isAiMode} />
        <View height={64}>
          {isAiMode && (
            <Animated.View entering={FadeIn.duration(300)} exiting={FadeOut.duration(200)}>
              <YStack gap='$3' mt='$4' px='$7'>
                {suggestions.map((item, i) => (
                  <Pressable key={i}>
                    <XStack alignItems='center' gap='$3'>
                      <Typography.Text fontSize='$4'>{item.icon}</Typography.Text>
                      <Typography.TextSecondary fontSize={15}>{item.text}</Typography.TextSecondary>
                    </XStack>
                  </Pressable>
                ))}
              </YStack>
            </Animated.View>
          )}
        </View>
      </YStack>

      <View position='absolute' right={24} bottom={64 + 24} zIndex={1000}>
        <ModeSwitch mode={mode} onToggle={toggleMode} />
      </View>
    </GradientHeader>
  );
}
