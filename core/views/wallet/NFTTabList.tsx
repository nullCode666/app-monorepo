import { Link } from 'expo-router';
import { ComponentType, useCallback, useMemo } from 'react';
import { Dimensions, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { FlashListProps, Pressable, Tabs, Typography, View, XStack, YStack } from '@/core/components';
import { NFTS } from '@/core/constants/wallet';

const { width } = Dimensions.get('window');
const ITEM_WIDTH = ((width - 16 * 2) - 16 * 2) / 3;

type NFTItem = {
  id: string;
  name: string;
  collection: string;
  backgroundColor: string;
  artworkLabel?: string;
  quantity?: string;
  badgeLabel?: string;
};

const TabsFlashList = Tabs.FlatList as unknown as ComponentType<
  FlashListProps<NFTItem> & {
    columnWrapperStyle?: any;
  }
>;

export default function NFTTabList() {
  const { bottom } = useSafeAreaInsets();

  const styles = useMemo(
    () =>
      StyleSheet.create({
        listContent: {
          paddingTop: 16,
          paddingHorizontal: 16,
          paddingBottom: bottom + 172,
        },
        columnWrapper: {
          gap: 16,
        },
      }),
    [bottom]
  );

  const renderItem = useCallback(
    ({ item }: { item: NFTItem }) => (
      <Link href='/nft-detail' asChild>
        <Pressable>
          <YStack width={ITEM_WIDTH} gap='$2' borderRadius='$2' mb='$4'>
            <View
              width={ITEM_WIDTH}
              height={ITEM_WIDTH}
              borderRadius={12}
              alignItems='center'
              justifyContent='center'
              style={{ backgroundColor: item.backgroundColor }}
            >
              {item.artworkLabel ? <Typography.TextPrimary>{item.artworkLabel}</Typography.TextPrimary> : null}
            </View>
            <YStack gap='$1'>
              <XStack gap='$2' alignItems='center'>
                <Typography.TextSecondary numberOfLines={1}>
                  {item.id}
                </Typography.TextSecondary>
              </XStack>
              <Typography.Text numberOfLines={1}>
                {item.name}
              </Typography.Text>
            </YStack>
          </YStack>
        </Pressable>
      </Link>
    ),
    []
  );

  const keyExtractor = useCallback((item: NFTItem) => item.id, []);

  return (
    <TabsFlashList
      data={NFTS}
      renderItem={renderItem}
      keyExtractor={keyExtractor}
      showsVerticalScrollIndicator={false}
      numColumns={3}
      contentContainerStyle={styles.listContent}
      columnWrapperStyle={styles.columnWrapper}
    />
  );
}
