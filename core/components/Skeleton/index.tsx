import { MotiView } from 'moti';
import { styled, type GetProps } from 'tamagui';

import type { Properties } from 'csstype';
import type { DimensionValue } from 'react-native';

const AnimatedSkeleton = styled(MotiView, {
  name: 'Skeleton',
  backgroundColor: '$background3',
});

export type SkeletonProps = GetProps<typeof AnimatedSkeleton> & {
  width?: DimensionValue;
  height?: DimensionValue;
};

const defaultFrom = { opacity: 0.45 } as const;
const defaultAnimate = { opacity: 1 } as const;
const defaultTransition = { type: 'timing', duration: 1000, repeat: Infinity } as unknown as Properties['transition'];

export default function Skeleton({
  width = '100%',
  height = '100%',
  from = defaultFrom,
  animate = defaultAnimate,
  transition,
  ...rest
}: SkeletonProps) {
  const appliedTransition = transition ?? defaultTransition;

  return (
    <AnimatedSkeleton
      width={width}
      height={height}
      from={from}
      animate={animate}
      transition={appliedTransition}
      {...rest}
    />
  );
}

