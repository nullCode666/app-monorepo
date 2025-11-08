import { useMemo } from 'react';
import { LineGraph, type GraphPoint } from 'react-native-graph';
import { useTheme } from 'tamagui';

import View from '../View';

export type LineGraphProps = {
  points: GraphPoint[],
}

export default function LineGraphChart({ points, ...rest }: LineGraphProps) {
  const theme = useTheme();
  const [red, green] = [theme.red10.val, theme.green10.val];

  const values = points.map(point => point.value);
  const min = Math.min(...values);
  const max = Math.max(...values);

  const yRange = useMemo(() => {
    const padding = Math.max(1, (max - min) * 0.08);

    return {
      min: min - padding,
      max: max + padding,
    };
  }, [min, max]);

  if (points.length === 0) {
    return <View width='100%' height='100%' />;
  }

  const { date: beginDate, value: beginValue } = points[0];
  const { date: endDate, value: endValue } = points[points.length - 1];

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
