import { Dimensions, StyleSheet } from 'react-native';

import { FlashList, View } from '@/core/components';
import { NFTS } from '@/core/constants/wallet';
import NFTItem, { NFTItemData } from '@/core/views/wallet/containers/NFTItem';

const { width } = Dimensions.get('window');

const NFT_ITEM_WIDTH = (width - 32 - 24) / 3;

const styles = StyleSheet.create({
  contentContainer: { paddingHorizontal: 16 },
});

export function NFTListView() {
  return (
    <FlashList<NFTItemData>
      data={NFTS}
      renderItem={({ item }) => <NFTItem item={item} width={NFT_ITEM_WIDTH} />}
      keyExtractor={(item) => item.id}
      showsVerticalScrollIndicator={false}
      numColumns={3}
      ListHeaderComponent={() => <View height={24}></View>}
      contentContainerStyle={styles.contentContainer}
    />
  );
}
