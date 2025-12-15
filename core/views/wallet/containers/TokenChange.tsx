import { memo } from 'react';
import { TextProps } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
  Easing,
  interpolateColor,
} from 'react-native-reanimated';

import { Typography } from '@/core/components';

interface TokenChangeProps extends Omit<TextProps, 'children'> {
  change: number;
}

const AnimatedTypographyNumber = Animated.createAnimatedComponent(Typography.NumberSecondary);

function TokenChangeComponent({ change, ...rest }: TokenChangeProps) {
  // 使用shared value存储变化值，用于动画
  const animatedChange = useSharedValue(change);
  
  // 当变化值变化时，更新动画值
  if (animatedChange.value !== change) {
    animatedChange.value = withTiming(change, {
      duration: 800,
      easing: Easing.out(Easing.ease),
    });
  }
  
  // 动画样式
  const animatedStyle = useAnimatedStyle(() => {
    // 根据变化值设置颜色动画
    const color = interpolateColor(
      change,
      [-10, 0, 10],
      ['#EF4444', '#9CA3AF', '#10B981']
    );
    
    return {
      color,
      opacity: withTiming(1, {
        duration: 300,
      }),
      transform: [
        {
          scale: withTiming(1, {
            duration: 300,
          }),
        },
      ],
    };
  });

  return (
    <AnimatedTypographyNumber
      numberOfLines={1}
      percentageChange={change}
      wrapInBrackets
      fontSize={15}
      style={animatedStyle}
      {...rest}
    />
  );
}

// 使用memo避免不必要的重渲染
export const TokenChange = memo(TokenChangeComponent);

export default TokenChange;
