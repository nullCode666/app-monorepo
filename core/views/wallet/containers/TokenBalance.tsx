import { memo } from 'react';
import { TextProps } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
  Easing,
} from 'react-native-reanimated';

import { Typography } from '@/core/components';

interface TokenBalanceProps extends Omit<TextProps, 'children'> {
  balance: string;
  balanceFiat: string;
}

const AnimatedTypographyNumber = Animated.createAnimatedComponent(Typography.Number);
const AnimatedTypographyNumberSecondary = Animated.createAnimatedComponent(Typography.NumberSecondary);

function TokenBalanceComponent({ balance, balanceFiat, ...rest }: TokenBalanceProps) {
  // 解析余额数值，用于动画
  const balanceValue = parseFloat(balance) || 0;
  const balanceFiatValue = parseFloat(balanceFiat.replace(/[^\d.-]/g, '')) || 0;
  
  // 使用shared value存储数值，用于动画
  const animatedBalance = useSharedValue(balanceValue);
  const animatedBalanceFiat = useSharedValue(balanceFiatValue);
  
  // 当余额变化时，更新动画值
  if (animatedBalance.value !== balanceValue) {
    animatedBalance.value = withTiming(balanceValue, {
      duration: 800,
      easing: Easing.out(Easing.ease),
    });
  }
  
  if (animatedBalanceFiat.value !== balanceFiatValue) {
    animatedBalanceFiat.value = withTiming(balanceFiatValue, {
      duration: 800,
      easing: Easing.out(Easing.ease),
    });
  }
  
  // 动画样式
  const animatedStyle = useAnimatedStyle(() => {
    return {
      opacity: withTiming(1, {
        duration: 300,
      }),
      transform: [
        {
          translateY: withTiming(0, {
            duration: 500,
            easing: Easing.out(Easing.ease),
          }),
        },
      ],
    };
  });

  return (
    <>
      <AnimatedTypographyNumber
        numberOfLines={1}
        color='$color'
        fontSize={17}
        fontWeight='600'
        style={animatedStyle}
        {...rest}
      >
        {balance}
      </AnimatedTypographyNumber>
      <AnimatedTypographyNumberSecondary
        numberOfLines={1}
        color='$color10'
        fontSize={15}
        style={animatedStyle}
        {...rest}
      >
        {balanceFiat}
      </AnimatedTypographyNumberSecondary>
    </>
  );
}

// 使用memo避免不必要的重渲染
export const TokenBalance = memo(TokenBalanceComponent);

export default TokenBalance;
