import { Link, useLocalSearchParams, useNavigation } from 'expo-router';
import { useCallback, useEffect, useMemo } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { FlashList, ListItem, PieChart, Pressable, Tabs, Typography, View, YStack } from '@/core/components';
import {
  TOKEN_DETAIL_ACTIVITY,
  TOKEN_DETAIL_DISTRIBUTION,
  TOKEN_DETAIL_TEMPLATES,
  TOKEN_LIST,
  type HistoryRow,
} from '@/core/constants/wallet';
import HistoryActivityItem, { HistoryActivityItemData } from '@/core/views/wallet/containers/HistoryActivityItem';
import TokenDetailHeader from '@/core/views/wallet/containers/TokenDetailHeader';


export default function TokenDetailScreen() {
  const { top, bottom } = useSafeAreaInsets();
  const navigation = useNavigation();
  const { symbol: symbolParam, name: nameParam } = useLocalSearchParams<{ symbol?: string | string[]; name?: string | string[] }>();

  const symbol = useMemo(() => {
    const raw = Array.isArray(symbolParam) ? symbolParam[0] : symbolParam;
    return raw?.toUpperCase();
  }, [symbolParam]);

  const explicitName = useMemo(() => {
    const raw = Array.isArray(nameParam) ? nameParam[0] : nameParam;
    return raw;
  }, [nameParam]);

  const templateName = useMemo(() => {
    if (!symbol) {
      return undefined;
    }

    const template = TOKEN_DETAIL_TEMPLATES[symbol.toLowerCase()];
    return template?.name;
  }, [symbol]);

  const headerTitle = explicitName ?? templateName ?? symbol ?? 'Token';

  const preferredToken = useMemo(() => {
    if (!symbol) {
      return undefined;
    }

    const normalizedSymbol = symbol.toLowerCase();
    const matches = TOKEN_LIST.filter(token => token.symbol.toLowerCase() === normalizedSymbol);
    if (!matches.length) {
      return undefined;
    }

    return matches.find(token => token.multiple) ?? matches[0];
  }, [symbol]);

  const distribution = useMemo(() => {
    const key = symbol?.toLowerCase();
    if (!key) {
      return undefined;
    }

    return TOKEN_DETAIL_DISTRIBUTION[key];
  }, [symbol]);

  const showTabs = Boolean(distribution);

  const renderHistoryItem = useCallback(({ item }: { item: HistoryRow }) => {
    if (item.type === 'section') {
      return (
        <Typography.TextSecondary
          p='$4'
          pb='$2'
          color='$color11'
          textTransform='uppercase'
        >
          {item.date}
        </Typography.TextSecondary>
      );
    }

    const { type: _ignored, ...historyItem } = item;
    return <HistoryActivityItem item={historyItem as HistoryActivityItemData} />;
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
      <FlashList<HistoryRow>
        data={TOKEN_DETAIL_ACTIVITY}
        renderItem={renderHistoryItem}
        keyExtractor={item => item.id}
        ListHeaderComponent={() => (
          <TokenDetailHeader symbol={symbol} />
        )}
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
        <Tabs.ScrollView
          showsVerticalScrollIndicator={false}
        >
          <YStack gap='$2' pt='$4'>
            {distribution?.segments?.map?.(item => {
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
              const href = sendParams ? { pathname: '/send/token', params: sendParams } : '/send/wallet';

              return (
                <Link key={item.id} href={href} asChild>
                  <Pressable>
                    {() => (
                      <ListItem
                        leading={(
                          <PieChart
                            size={48}
                            thickness={4}
                            gapAngle={0}
                            data={[{ value: item.share, color: item.color }, { value: 1 - item.share, color: 'none' }]}
                          >
                            <Typography.NumberSecondary fontSize={12} lineHeight={12}>{percentage}%</Typography.NumberSecondary>
                          </PieChart>
                        )}
                        bodyLeftTop={<Typography.Text numberOfLines={1}>{item.label}</Typography.Text>}
                        bodyLeftBottom={item.subLabel ? (
                          <Typography.TextSecondary fontSize={12} lineHeight={12} numberOfLines={1}>
                            {item.subLabel}
                          </Typography.TextSecondary>
                        ) : undefined}
                        bodyRightTop={(
                          <Typography.NumberSecondary color='$color12' numberOfLines={1}>
                            {`${item.amount} ${distribution?.symbol}`}
                          </Typography.NumberSecondary>
                        )}
                        bodyRightBottom={(
                          <Typography.NumberSecondary numberOfLines={1}>
                            {item.fiatValue}
                          </Typography.NumberSecondary>
                        )}
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
          keyExtractor={(item: HistoryRow) => item.id}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: bottom + 64, paddingTop: 24 }}
        />
      </Tabs.Tab>
    </Tabs.Container>
  );
}
