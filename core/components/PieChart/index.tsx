import { ComponentProps, ReactNode, memo, useMemo } from 'react';
import Svg, { Circle, Path } from 'react-native-svg';
import { useTheme } from 'tamagui';

import View from '../View';

const FULL_CIRCLE = 360;
const MIN_SWEEP = 0.001;

export type PieChartSegment = {
  value: number;
  color?: string;
};

type ViewProps = Omit<ComponentProps<typeof View>, 'children'>;

export type PieChartProps = ViewProps & {
  data: PieChartSegment[];
  size?: number;
  thickness?: number;
  trackColor?: string;
  startAngle?: number;
  gapAngle?: number;
  showTrack?: boolean;
  children?: ReactNode;
};

type ComputedSegment = {
  path: string;
  color: string;
  sweep: number;
};

function polarToCartesian(cx: number, cy: number, radius: number, angleInDegrees: number) {
  const angleInRadians = ((angleInDegrees - 90) * Math.PI) / 180;

  return {
    x: cx + radius * Math.cos(angleInRadians),
    y: cy + radius * Math.sin(angleInRadians),
  };
}

function describeDonutSegment(
  cx: number,
  cy: number,
  outerRadius: number,
  innerRadius: number,
  startAngle: number,
  endAngle: number,
): string {
  const sweep = Math.max(Math.min(endAngle - startAngle, FULL_CIRCLE - MIN_SWEEP), MIN_SWEEP);
  const largeArcFlag = sweep > 180 ? 1 : 0;
  const safeInnerRadius = Math.max(innerRadius, MIN_SWEEP);

  const outerStart = polarToCartesian(cx, cy, outerRadius, startAngle);
  const outerEnd = polarToCartesian(cx, cy, outerRadius, endAngle);
  const innerStart = polarToCartesian(cx, cy, safeInnerRadius, endAngle);
  const innerEnd = polarToCartesian(cx, cy, safeInnerRadius, startAngle);

  return [
    'M', outerStart.x, outerStart.y,
    'A', outerRadius, outerRadius, 0, largeArcFlag, 1, outerEnd.x, outerEnd.y,
    'L', innerStart.x, innerStart.y,
    'A', safeInnerRadius, safeInnerRadius, 0, largeArcFlag, 0, innerEnd.x, innerEnd.y,
    'Z',
  ].join(' ');
}

function PieChartComponent({
  data,
  size = 36,
  thickness = 4,
  trackColor,
  startAngle = 0,
  gapAngle = 4,
  showTrack = true,
  children,
  style,
  ...rest
}: PieChartProps) {
  const theme = useTheme();

  const radius = size / 2;
  const clampedThickness = Math.min(Math.max(thickness, 1), radius);
  const outerRadius = radius;
  const innerRadius = outerRadius - clampedThickness;
  const trackStrokeColor = trackColor ?? theme.color5?.val;

  const segments = useMemo<ComputedSegment[]>(() => {
    const positiveSegments = data.filter(segment => segment.value > 0);
    const total = positiveSegments.reduce((sum, segment) => sum + segment.value, 0);

    if (total <= 0) {
      return [];
    }

    const normalizedGap = positiveSegments.length > 1 ? Math.max(gapAngle, 0) : 0;
    let cursor = 0;

    return positiveSegments
      .map((segment, index) => {
        const ratio = segment.value / total;
        const startRatio = cursor;
        const endRatio = cursor + ratio;
        cursor = endRatio;

        const rawSweep = (endRatio - startRatio) * FULL_CIRCLE;
        const trimmedSweep = Math.max(rawSweep - normalizedGap, 0);

        if (trimmedSweep <= 0) {
          return null;
        }

        const halfGap = normalizedGap / 2;
        const segmentStart = startAngle + startRatio * FULL_CIRCLE + halfGap;
        const segmentEnd = segmentStart + trimmedSweep;

        const color = segment.color ?? theme.primary?.val;

        return {
          color,
          sweep: trimmedSweep,
          path: describeDonutSegment(radius, radius, outerRadius, innerRadius, segmentStart, segmentEnd),
        } satisfies ComputedSegment;
      })
      .filter((segment): segment is ComputedSegment => Boolean(segment));
  }, [data, gapAngle, innerRadius, outerRadius, radius, startAngle, theme.primary?.val]);

  return (
    <View
      {...rest}
      width={size}
      height={size}
      alignItems='center'
      justifyContent='center'
      style={style}
    >
      <Svg width={size} height={size}>
        {showTrack ? (
          <Circle
            cx={radius}
            cy={radius}
            r={radius - clampedThickness / 2}
            stroke={trackStrokeColor}
            strokeWidth={clampedThickness}
            fill='none'
          />
        ) : null}

        {segments.map((segment, index) => (
          <Path key={index} d={segment.path} fill={segment.color} />
        ))}
      </Svg>

      {children ? (
        <View
          pointerEvents='none'
          position='absolute'
          alignItems='center'
          justifyContent='center'
        >
          {children}
        </View>
      ) : null}
    </View>
  );
}

export default memo(PieChartComponent);

