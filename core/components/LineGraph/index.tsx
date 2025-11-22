import { useMemo } from 'react';
import { LineGraph, type GraphPoint } from 'react-native-graph';

import { useTheme } from '../useTheme';
import View from '../View';

export type LineGraphProps = {
  points: GraphPoint[],
}

export default function LineGraphChart({ points, ...rest }: LineGraphProps) {
  const theme = useTheme();
  const [red, green] = [theme.red10.val, theme.green10.val];

  const { min, max, first, last } = useMemo(() => {
    if (points.length === 0) {
      return { min: 0, max: 0, first: null, last: null };
    }
    let minVal = points[0].value;
    let maxVal = points[0].value;

    for (let i = 1; i < points.length; i++) {
      const val = points[i].value;
      if (val < minVal) minVal = val;
      if (val > maxVal) maxVal = val;
    }
    return { min: minVal, max: maxVal, first: points[0], last: points[points.length - 1] };
  }, [points]);

  const yRange = useMemo(() => {
    const padding = Math.max(1, (max - min) * 0.08);

    return {
      min: min - padding,
      max: max + padding,
    };
  }, [min, max]);

  if (points.length === 0 || !first || !last) {
    return <View width='100%' height='100%' />;
  }

  const { date: beginDate, value: beginValue } = first;
  const { date: endDate, value: endValue } = last;

  return (
    <View width='100%' height='100%'>
      <LineGraph
        animated={false}
        style={{ flex: 1 }}
        points={points}
        lineThickness={2}
        color={endValue >= beginValue ? green : red}
        range={{
          x: {
            min: beginDate,
            max: endDate,
          },
          y: yRange,
        }}
        {...rest}
      />
    </View>
  );
}
