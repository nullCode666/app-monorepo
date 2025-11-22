import { Link } from 'expo-router';
import { useCallback } from 'react';

import { ListItem, PieChart, Pressable, Tabs, Typography, View, YStack } from '@/core/components';
import { TOKEN_DETAIL_ACTIVITY, TOKEN_DETAIL_DISTRIBUTION, TOKEN_LIST } from '@/core/constants/wallet';
import HistoryActivityItem from '@/core/views/wallet/containers/HistoryActivityItem';
import TokenDetailHeader from '@/core/views/wallet/containers/TokenDetailHeader';

type TokenDetailActivity = (typeof TOKEN_DETAIL_ACTIVITY)[number];
type TokenDetailDistribution = (typeof TOKEN_DETAIL_DISTRIBUTION)[string];

type Props = {
  symbol?: string;
  distribution?: TokenDetailDistribution;
  preferredToken?: (typeof TOKEN_LIST)[number];
  top: number;
  bottom: number;
};

export function MultiTokenDetail({ symbol, distribution, preferredToken, top, bottom }: Props) {
  const renderHistoryItem = useCallback(({ item, index }: { item: TokenDetailActivity; index: number }) => {
    if (item.type === 'section') {
      return (
        <Typography.TextSecondary py='$4' pb='$2' color='$color11' textTransform='uppercase'>
          {item.date}
        </Typography.TextSecondary>
      );
    }

    const isLast = index === TOKEN_DETAIL_ACTIVITY.length - 1;
    return <HistoryActivityItem item={item} isLast={isLast} />;
  }, []);

  const historyContentContainerStyle = {
    paddingBottom: bottom + 64,
    paddingTop: 24,
    paddingHorizontal: 16,
  };

  return (
    <Tabs.Container
      renderHeader={() => (
        <View paddingTop={top + 54}>
          <TokenDetailHeader symbol={symbol} />
        </View>
      )}
      minHeaderHeight={top + 54}
    >
      <Tabs.Tab name='distribution' label='资产分布'>
        <Tabs.ScrollView showsVerticalScrollIndicator={false}>
          <YStack gap='$2' pt='$4'>
            {distribution?.segments?.map?.((item, index) => {
              const percentage = Math.round(item.share * 100);
              const sendParams = preferredToken
                ? {
                  tokenId: preferredToken.id,
                  tokenSymbol: preferredToken.symbol,
                  tokenName: preferredToken.name ?? preferredToken.symbol,
                  networkId: item.id,
                  networkLabel: item.label,
                }
                : undefined;
              const href = sendParams ? { pathname: '/send/token', params: sendParams } : '/send';
              const isLast = index === (distribution?.segments?.length ?? 0) - 1;

              return (
                <Link key={item.id} href={href} asChild>
                  <Pressable>
                    {() => (
                      <ListItem
                        px='$4'
                        separator={!isLast}
                        leading={
                          <PieChart
                            size={48}
                            thickness={4}
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
                        }
                        bodyLeftTop={<Typography.Text numberOfLines={1}>{item.label}</Typography.Text>}
                        bodyLeftBottom={
                          item.subLabel ? (
                            <Typography.AddressSecondary short>{item.subLabel}</Typography.AddressSecondary>
                          ) : undefined
                        }
                        bodyRightTop={
                          <Typography.NumberSecondary color='$color12' numberOfLines={1}>
                            {`${item.amount} ${distribution?.symbol}`}
                          </Typography.NumberSecondary>
                        }
                        bodyRightBottom={
                          <Typography.NumberSecondary numberOfLines={1}>{item.fiatValue}</Typography.NumberSecondary>
                        }
                      />
                    )}
                  </Pressable>
                </Link>
              );
            })}
          </YStack>
        </Tabs.ScrollView>
      </Tabs.Tab>
      <Tabs.Tab name='history' label='历史记录'>
        <Tabs.FlatList
          data={TOKEN_DETAIL_ACTIVITY}
          renderItem={renderHistoryItem}
          keyExtractor={(item: TokenDetailActivity) => item.id}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={historyContentContainerStyle}
        />
      </Tabs.Tab>
    </Tabs.Container>
  );
}
