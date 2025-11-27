import { ScrollView, Typography } from '@/core/components';
import { TRADE_TOKEN_MAP } from '@/core/constants/trade';
import { GradientHeader } from '@/core/views/header/GradientHeader';
import { HeaderLeft } from '@/core/views/header/HeaderLeft';
import { HeaderRight } from '@/core/views/header/HeaderRight';
import { TradePanel } from '@/core/views/trade/containers/TradePanel';

type TradeHomeViewProps = {
  headerShown?: boolean;
};

export function TradeHomeView({ headerShown = true }: TradeHomeViewProps) {
  const content = (
    <ScrollView keyboardShouldPersistTaps='handled' px='$4' pt='$6'>
      <TradePanel
        from={{
          token: TRADE_TOKEN_MAP.trx,
          amount: '0.0056372',
          amountHint: '≈¥2.10178',
          walletLabel: 'Wallet 2...WrbW',
          walletAmount: '37.16185 TRX',
          walletActionLabel: '全部',
        }}
        to={{
          token: TRADE_TOKEN_MAP.usdt,
          amount: '0.295618',
          amountHint: '≈¥2.10184',
          walletLabel: 'Wallet 2...WrbW',
          walletAmount: '2.5861 USDT',
          walletActionLabel: undefined,
        }}
        actionButton={{ label: '兑换' }}
        infoRows={[
          {
            label: '兑换率',
            children: <Typography.NumberSecondary fontSize={14}>{'1 TRX ≈ 0.29561 USDT'}</Typography.NumberSecondary>,
            chevron: true,
          },
          {
            label: '滑点',
            children: <Typography.Text fontSize={14}>自动 | 1%</Typography.Text>,
            chevron: true,
          },
          {
            label: '最低收款金额',
            children: (
              <Typography.NumberSecondary color='$color' fontSize={14}>
                {'0.29266 USDT'}
              </Typography.NumberSecondary>
            ),
          },
          {
            label: '交易手续费',
            children: (
              <Typography.NumberSecondary color='$color' fontSize={14}>
                {'0.0002 USDT'}
              </Typography.NumberSecondary>
            ),
          },
        ]}
      />
    </ScrollView>
  );

  if (!headerShown) {
    return content;
  }

  return (
    <GradientHeader
      title='Trade'
      gradientColor={null}
      leftItem={<HeaderLeft />}
      rightItem={<HeaderRight mode='history' />}
    >
      {content}
    </GradientHeader>
  );
}
