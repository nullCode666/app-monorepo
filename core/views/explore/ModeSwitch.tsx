import { Pressable, XStack } from '@/core/components';
import { Globe, Sparkles } from '@tamagui/lucide-icons';
import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { StyleSheet } from 'react-native';
import Animated, { useAnimatedStyle, useDerivedValue, useSharedValue, withTiming } from 'react-native-reanimated';

interface ModeSwitchProps {
  mode: 'google' | 'ai';
  onToggle: () => void;
}

const AnimatedLinearGradient = Animated.createAnimatedComponent(LinearGradient);

export const ModeSwitch = ({ mode, onToggle }: ModeSwitchProps) => {
  const isAi = mode === 'ai';

  const translateX = useSharedValue(isAi ? 0 : 32);
  const progress = useDerivedValue(() => {
    return withTiming(isAi ? 0 : 1, { duration: 300 });
  });

  React.useEffect(() => {
    translateX.value = withTiming(isAi ? 0 : 40, { duration: 300 });
  }, [isAi, translateX]);

  const indicatorStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
  }));

  const gradientStyle = useAnimatedStyle(() => ({
    opacity: 1 - progress.value,
  }));

  const googleStyle = useAnimatedStyle(() => ({
    opacity: progress.value,
  }));

  return (
    <Pressable onPress={onToggle}>
      <XStack
        backgroundColor='$backgroundPress'
        borderRadius={100}
        width={84}
        height={36}
        alignItems='center'
        padding={2}
        position='relative'
      >
        {/* Sliding Indicator Background */}
        <Animated.View style={[styles.switchIndicator, indicatorStyle]}>
          {/* AI Gradient Background */}
          <AnimatedLinearGradient
            colors={['#FF9F0A', '#8E3840', '#4A1D4E']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={[StyleSheet.absoluteFill, styles.indicatorContent, gradientStyle]}
          />
          {/* Google Gray Background */}
          <Animated.View
            style={[
              StyleSheet.absoluteFill,
              styles.indicatorContent,
              styles.googleBackground, // Neutral/White for Google
              googleStyle,
              styles.shadow,
            ]}
          />
        </Animated.View>

        {/* Icons Layer */}
        <XStack flex={1} zIndex={2} justifyContent='space-between' width='100%' paddingHorizontal={0}>
          {/* AI Icon Area */}
          <Pressable onPress={() => !isAi && onToggle()} style={styles.iconContainer}>
            <Sparkles size={18} color={isAi ? 'white' : '$color10'} />
          </Pressable>

          {/* Google Icon Area */}
          <Pressable onPress={() => isAi && onToggle()} style={styles.iconContainer}>
            <Globe size={18} color={!isAi ? 'black' : '$color10'} />
          </Pressable>
        </XStack>
      </XStack>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  switchIndicator: {
    position: 'absolute',
    left: 2,
    width: 40,
    height: 32,
    borderRadius: 18,
    zIndex: 1,
  },
  indicatorContent: {
    borderRadius: 18,
  },
  googleBackground: {
    backgroundColor: '#FFFFFF',
  },
  shadow: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  iconContainer: {
    width: 40, // Explicit width to match indicator width
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
  },
});
