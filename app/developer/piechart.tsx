import { PieChart, Typography, XStack, YStack } from '@/core/components';
import { DemoPage, DemoSection } from '@/core/views/developer/DemoComponents';

const MULTI_SEGMENT_EXAMPLE = [
  { value: 45, color: '#6366F1' },
  { value: 30, color: '#22D3EE' },
  { value: 25, color: '#A855F7' },
];

const DISTRIBUTION = [
  { chain: 'Arbitrum One', share: 0.32, amount: 2.23582, fiat: 15.94, color: '#6577FF' },
  { chain: 'Ethereum', share: 0.26, amount: 1.8531, fiat: 13.21, color: '#60A5FA' },
  { chain: 'Solana', share: 0.25, amount: 1.75284, fiat: 12.5, color: '#A855F7' },
  { chain: 'Base', share: 0.1, amount: 0.67241, fiat: 4.79, color: '#38BDF8' },
  { chain: 'Polygon', share: 0.04, amount: 0.29365, fiat: 2.09, color: '#F472B6' },
  { chain: 'Avalanche C-Chain', share: 0.01, amount: 0.095176, fiat: 0.67874, color: '#F97316' },
  { chain: 'Sui', share: 0.01, amount: 0.050327, fiat: 0.3589, color: '#2DD4BF' },
  { chain: 'BNB Smart Chain', share: 0.01, amount: 0.035472, fiat: 0.25297, color: '#FCD34D' },
];

function formatToken(value: number) {
  return value.toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 5,
  });
}

function formatFiat(value: number) {
  return value.toLocaleString(undefined, {
    style: 'currency',
    currency: 'CNY',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

export default function PieChartScreen() {
  return (
    <DemoPage>
      <DemoSection
        title='Basic donut chart'
        description='Pass an array of segments and optionally render any content in the centre of the ring.'
      >
        <YStack gap='$3' alignItems='center'>
          <PieChart size={96} thickness={16} data={MULTI_SEGMENT_EXAMPLE} gapAngle={2}>
            <Typography.Text>45%</Typography.Text>
            <Typography.TextSecondary>Primary</Typography.TextSecondary>
          </PieChart>

          <YStack gap='$2' alignItems='center'>
            <Typography.TextSecondary>Change the thickness</Typography.TextSecondary>
            <PieChart size={72} thickness={20} data={MULTI_SEGMENT_EXAMPLE}>
              <Typography.NumberPrimary>3</Typography.NumberPrimary>
            </PieChart>
          </YStack>
        </YStack>
      </DemoSection>

      <DemoSection
        title='Wallet distribution list'
        description='The component is light enough to render many small charts in a scrolling list. Each donut highlights the share while the neutral track shows the remainder.'
      >
        <YStack gap='$4'>
          <YStack gap='$1' alignItems='center'>
            <Typography.TextSecondary>USDC</Typography.TextSecondary>
            <Typography.NumberHeading>7.0095958</Typography.NumberHeading>
            <Typography.TextSecondary>≈ ¥49.98</Typography.TextSecondary>
          </YStack>

          <YStack gap='$3'>
            {DISTRIBUTION.map((item) => {
              const percentage = Math.round(item.share * 100);

              return (
                <XStack key={item.chain} alignItems='center' gap='$3' justifyContent='space-between'>
                  <PieChart
                    size={48}
                    thickness={6}
                    gapAngle={0}
                    data={[
                      { value: item.share, color: item.color },
                      { value: 1 - item.share, color: 'none' },
                    ]}
                  >
                    <Typography.NumberSecondary fontSize={12} lineHeight={12}>
                      {percentage}%
                    </Typography.NumberSecondary>
                  </PieChart>

                  <YStack flex={1} gap='$1'>
                    <Typography.TextPrimary>{item.chain}</Typography.TextPrimary>
                    <Typography.NumberSecondary>{`${formatToken(item.amount)} USDC`}</Typography.NumberSecondary>
                  </YStack>

                  <Typography.NumberSecondary>{formatFiat(item.fiat)}</Typography.NumberSecondary>
                </XStack>
              );
            })}
          </YStack>
        </YStack>
      </DemoSection>
    </DemoPage>
  );
}
