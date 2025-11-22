import { Link, useNavigation } from 'expo-router';
import { useCallback, useEffect, useMemo } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import {
  FlashList,
  ListItem,
  PieChart,
  Pressable,
  Tabs,
  Typography,
  View,
  YStack,
} from '@/core/components';
import {
  TOKEN_DETAIL_ACTIVITY,
  TOKEN_DETAIL_DISTRIBUTION,
  TOKEN_DETAIL_TEMPLATES,
  TOKEN_LIST,
} from '@/core/constants/wallet';
import HistoryActivityItem from '@/core/views/wallet/containers/HistoryActivityItem';
import TokenDetailHeader from '@/core/views/wallet/containers/TokenDetailHeader';

type Props = {
  symbol?: string;
  name?: string;
};

type TokenDetailActivity = (typeof TOKEN_DETAIL_ACTIVITY)[number];
type TokenDetailDistribution = (typeof TOKEN_DETAIL_DISTRIBUTION)[string];

export function TokenDetailView({ symbol: symbolParam, name: nameParam }: Props) {
  const { top, bottom } = useSafeAreaInsets();
  const navigation = useNavigation();

  const symbol = useMemo(() => {
    return symbolParam?.toUpperCase();
  }, [symbolParam]);

  const templateName = useMemo(() => {
    if (!symbol) {
      return undefined;
    }

    const template = TOKEN_DETAIL_TEMPLATES[symbol.toLowerCase()];
    return template?.name;
  }, [symbol]);

  const headerTitle = nameParam ?? templateName ?? symbol ?? 'Token';

  const preferredToken = useMemo(() => {
    if (!symbol) {
      return undefined;
    }

    const normalizedSymbol = symbol.toLowerCase();
    const matches = TOKEN_LIST.filter((token) => token.symbol.toLowerCase() === normalizedSymbol);
    if (!matches.length) {
      return undefined;
    }

    return matches.find((token) => token.multiple) ?? matches[0];
  }, [symbol]);

  const distribution = useMemo(() => {
    const key = symbol?.toLowerCase();
    if (!key) {
      return undefined;
    }

    return TOKEN_DETAIL_DISTRIBUTION[key];
  }, [symbol]);

  const showTabs = Boolean(distribution);

  const renderHistoryItem = useCallback(({ item }: { item: TokenDetailActivity }) => {
    if (item.type === 'section') {
      return (
        <Typography.TextSecondary py='$4' pb='$2' color='$color11' textTransform='uppercase'>
          {item.date}
        </Typography.TextSecondary>
      );
    }

    return <HistoryActivityItem item={item} />;
  }, []);

  useEffect(() => {
    navigation.setOptions({
      title: headerTitle,
      headerSearchBarOptions: {
        placeholder: '搜索',
        hideWhenScrolling: true,
      },
    });
  }, [headerTitle, navigation]);

  if (!showTabs) {
    return (
      <FlashList<TokenDetailActivity>
        data={TOKEN_DETAIL_ACTIVITY}
        renderItem={renderHistoryItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingHorizontal: 16 }}
        ListHeaderComponent={() => <TokenDetailHeader symbol={symbol} />}
      />
    );
  }

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
            {distribution?.segments?.map?.((item) => {
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

              return (
                <Link key={item.id} href={href} asChild>
                  <Pressable>
                    {() => (
                      <ListItem
                        py='$4'
                        px='$4'
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
                        bodyLeftTop={
                          <Typography.Text numberOfLines={1}>{item.label}</Typography.Text>
                        }
                        bodyLeftBottom={
                          item.subLabel ? (
                            <Typography.TextSecondary
                              fontSize={12}
                              lineHeight={12}
                              numberOfLines={1}
                            >
                              {item.subLabel}
                            </Typography.TextSecondary>
                          ) : undefined
                        }
                        bodyRightTop={
                          <Typography.NumberSecondary color='$color12' numberOfLines={1}>
                            {`${item.amount} ${distribution?.symbol}`}
                          </Typography.NumberSecondary>
                        }
                        bodyRightBottom={
                          <Typography.NumberSecondary numberOfLines={1}>
                            {item.fiatValue}
                          </Typography.NumberSecondary>
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
          contentContainerStyle={{
            paddingBottom: bottom + 64,
            paddingTop: 24,
            paddingHorizontal: 16,
          }}
        />
      </Tabs.Tab>
    </Tabs.Container>
  );
}
