import { ComponentType, useCallback, useMemo } from 'react';
import { Dimensions } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { FlashListProps, Tabs } from '@/core/components';
import { NFTS } from '@/core/constants/wallet';

import NFTItem, { type NFTItemData } from './containers/NFTItem';

const { width } = Dimensions.get('window');
const ITEM_WIDTH = ((width - 16 * 2) - 16 * 2) / 3;

const TabsFlashList = Tabs.FlatList as unknown as ComponentType<
  FlashListProps<NFTItemData> & {
    columnWrapperStyle?: any;
  }
>;

export default function NFTTabList() {
  const { bottom } = useSafeAreaInsets();

  const contentContainerStyle = useMemo(
    () => ({
      paddingTop: 16,
      paddingHorizontal: 16,
      paddingBottom: bottom + 172,
    }),
    [bottom],
  );

  const columnWrapperStyle = useMemo(() => ({ gap: 16 }), []);

  const renderItem = useCallback(
    ({ item }: { item: NFTItemData }) => (
      <NFTItem item={item} width={ITEM_WIDTH} />
    ),
    []
  );

  const keyExtractor = useCallback((item: NFTItemData) => item.id, []);

  return (
    <TabsFlashList
      data={NFTS}
      renderItem={renderItem}
      keyExtractor={keyExtractor}
      showsVerticalScrollIndicator={false}
      numColumns={3}
      contentContainerStyle={contentContainerStyle}
      columnWrapperStyle={columnWrapperStyle}
    />
  );
}
