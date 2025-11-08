import { useMemo } from 'react';

import { LineGraph, Typography, YStack } from '@/core/components';
import { DemoPage, DemoSection } from '@/core/views/developer/DemoComponents';

const NOW = Date.now();

const SAMPLE_POINTS = Array.from({ length: 24 }).map((_, index) => ({
  date: new Date(NOW - (24 - index) * 60 * 60 * 1000),
  value: 20 + Math.sin(index / 3) * 5 + index * 0.4,
}));

const DOWN_POINTS = SAMPLE_POINTS.map((point, idx) => ({
  date: point.date,
  value: point.value - idx * 1.2,
}));

export default function LineGraphScreen() {
  const upSeries = useMemo(() => SAMPLE_POINTS, []);
  const downSeries = useMemo(() => DOWN_POINTS, []);

  return (
    <DemoPage>
      <DemoSection
        title='Trend Coloring'
        description='The line color automatically changes based on whether the series closes above or below the opening value.'
      >
        <YStack gap='$3'>
          <Typography.TextSecondary>Positive trend</Typography.TextSecondary>
          <YStack height={160} borderRadius='$4' overflow='hidden' borderWidth={1} borderColor='$color5'>
            <LineGraph points={upSeries} />
          </YStack>
          <Typography.TextSecondary>Negative trend</Typography.TextSecondary>
          <YStack height={160} borderRadius='$4' overflow='hidden' borderWidth={1} borderColor='$color5'>
            <LineGraph points={downSeries} />
          </YStack>
        </YStack>
      </DemoSection>
    </DemoPage>
  );
}
