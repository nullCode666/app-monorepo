import { XStack, YStack } from '@/core/components';
import { FONT_FAMILY_TEXT } from '@/core/components/Typography';
import MaskedView from '@react-native-masked-view/masked-view';
import { Search, Sparkles } from '@tamagui/lucide-icons';
import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { StyleSheet } from 'react-native';
import Animated, {
  Easing,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSequence,
  withTiming,
} from 'react-native-reanimated';
// eslint-disable-next-line no-restricted-imports
import { GetThemeValueForKey, Input, useTheme } from 'tamagui';

type ExploreInputProps = {
  isAiMode: boolean;
};

const AnimatedLinearGradient = Animated.createAnimatedComponent(LinearGradient);

const GradientBorder = ({ children, isActive }: { children: React.ReactNode; isActive: boolean }) => {
  const opacity = useSharedValue(isActive ? 0.6 : 0);
  const colorPhase = useSharedValue(0);

  React.useEffect(() => {
    if (isActive) {
      opacity.value = withRepeat(
        withSequence(withTiming(1, { duration: 2000 }), withTiming(0.6, { duration: 2000 })),
        -1,
        true,
      );

      colorPhase.value = withRepeat(withTiming(3, { duration: 10000, easing: Easing.linear }), -1, false);
    } else {
      // 关闭时直接隐藏渐变（不强制停动画，反正看不见）
      opacity.value = 0;
      colorPhase.value = 0;
    }
  }, [isActive, opacity, colorPhase]);

  const g1Style = useAnimatedStyle(() => ({
    opacity: interpolate(colorPhase.value, [0, 1, 2, 3], [1, 0, 0, 1]) * opacity.value,
  }));

  const g2Style = useAnimatedStyle(() => ({
    opacity: interpolate(colorPhase.value, [0, 1, 2, 3], [0, 1, 0, 0]) * opacity.value,
  }));

  const g3Style = useAnimatedStyle(() => ({
    opacity: interpolate(colorPhase.value, [0, 1, 2, 3], [0, 0, 1, 0]) * opacity.value,
  }));

  // 非 AI 模式下显示普通边框，AI 模式下通过 padding 露出渐变边框
  const containerBorderProps = isActive
    ? ({
        borderWidth: 0,
        padding: 2,
      } as const)
    : ({
        borderWidth: 1,
        borderColor: '$borderColor',
        padding: 1,
      } as const);

  return (
    <XStack
      borderRadius='$12'
      overflow='hidden'
      height={54}
      width='100%'
      position='relative'
      alignItems='center'
      justifyContent='center'
      {...containerBorderProps}
    >
      {/* 渐变层：始终存在，只是 isActive=false 时透明 */}
      <AnimatedLinearGradient
        colors={['#FF0080', '#7928CA', '#FF0080']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={[StyleSheet.absoluteFill, g1Style, styles.gradientBorder]}
      />
      <AnimatedLinearGradient
        colors={['#FF4D4D', '#F9CB28', '#FF4D4D']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={[StyleSheet.absoluteFill, g2Style, styles.gradientBorder]}
      />
      <AnimatedLinearGradient
        colors={['#00F260', '#0575E6', '#00F260']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={[StyleSheet.absoluteFill, g3Style, styles.gradientBorder]}
      />

      {/* 内部内容容器：结构始终不变，避免 Android 复用造成的绘制 bug */}
      <XStack
        flex={1}
        backgroundColor='$background'
        borderRadius='$12'
        width='100%'
        height='100%'
        alignItems='center'
        overflow='hidden'
      >
        {children}
      </XStack>
    </XStack>
  );
};

const AiIcon = () => {
  const scale = useSharedValue(1);

  React.useEffect(() => {
    scale.value = withRepeat(
      withSequence(withTiming(1.2, { duration: 1000 }), withTiming(1, { duration: 1000 })),
      -1,
      true,
    );
  }, [scale]);

  const style = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  return (
    <Animated.View style={style}>
      <MaskedView style={styles.maskedView} maskElement={<Sparkles size={20} color='black' />}>
        <LinearGradient
          colors={['#FF9F0A', '#8E3840', '#4A1D4E']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.gradient}
        />
      </MaskedView>
    </Animated.View>
  );
};

export const ExploreInput = ({ isAiMode }: ExploreInputProps) => {
  const theme = useTheme();

  return (
    <YStack width='100%' px='$4' my='$4'>
      {/* 如果你想彻底强制 remount，可以加 key：key={isAiMode ? 'ai' : 'internet'} */}
      <GradientBorder isActive={isAiMode}>
        <XStack flex={1} alignItems='center' px='$4' gap='$4' width='100%'>
          {isAiMode ? <AiIcon /> : <Search size={20} color='$color10' />}

          <Input
            unstyled
            flex={1}
            placeholder={isAiMode ? 'Ready to Explore →' : 'Search Internet...'}
            placeholderTextColor={theme.color10.get()}
            color='$color'
            fontSize='$5'
            height='100%'
            paddingVertical={0}
            fontFamily={FONT_FAMILY_TEXT as GetThemeValueForKey<'fontFamily'>}
            letterSpacing={0}
            selectionColor={theme.primary.get()}
          />
        </XStack>
      </GradientBorder>
    </YStack>
  );
};

const styles = StyleSheet.create({
  maskedView: {
    width: 20,
    height: 20,
  },
  gradient: {
    flex: 1,
    borderRadius: 18,
  },
  gradientBorder: {
    width: '200%',
    height: '200%',
    left: 0,
    top: 0,
  },
});
