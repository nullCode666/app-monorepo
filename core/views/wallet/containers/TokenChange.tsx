import { memo, useEffect } from 'react';
import { TextProps } from 'react-native';
import Animated, {
  Easing,
  interpolateColor,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

import { Typography } from '@/core/components';

interface TokenChangeProps extends Omit<TextProps, 'children'> {
  change: number;
}

const AnimatedTypographyNumber = Animated.createAnimatedComponent(Typography.NumberSecondary);

function TokenChangeComponent({ change, ...rest }: TokenChangeProps) {
  const animatedChange = useSharedValue(change);

  useEffect(() => {
    animatedChange.value = withTiming(change, {
      duration: 800,
      easing: Easing.out(Easing.ease),
    });
  }, [change]);

  // 动画样式
  const animatedStyle = useAnimatedStyle(() => {
    // 根据变化值设置颜色动画
    const color = interpolateColor(
      animatedChange.value,
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
