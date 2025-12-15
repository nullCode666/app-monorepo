import { memo } from 'react';
import { TextProps } from 'react-native';
import Animated, {
  Easing,
  interpolateColor,
  useAnimatedStyle,
  useSharedValue,
  withTiming
} from 'react-native-reanimated';

import { Typography } from '@/core/components';

interface TokenPriceProps extends Omit<TextProps, 'children'> {
  price: string;
  change: number;
  color?: string;
}

const AnimatedTypographyNumber: any = Animated.createAnimatedComponent(Typography.NumberSecondary);

function TokenPriceComponent({ price, change, ...rest }: TokenPriceProps) {
  // 解析价格数值，用于动画
  const priceValue = parseFloat(price.replace(/[^\d.-]/g, '')) || 0;
  
  // 使用shared value存储数值，用于动画
  const animatedPrice = useSharedValue(priceValue);
  
  // 当价格变化时，更新动画值
  if (animatedPrice.value !== priceValue) {
    animatedPrice.value = withTiming(priceValue, {
      duration: 800,
      easing: Easing.out(Easing.ease),
    });
  }
  
  // 动画样式
  const animatedStyle = useAnimatedStyle(() => {
    // 根据价格变化设置颜色动画
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
    };
  });

  return (
    <AnimatedTypographyNumber
      numberOfLines={1}
      fontSize={15}
      style={animatedStyle}
      {...rest}
    >
      {price}
    </AnimatedTypographyNumber>
  );
}

// 使用memo避免不必要的重渲染
export const TokenPrice = memo(TokenPriceComponent);

export default TokenPrice;
