import { useNavigation } from 'expo-router';
import { useLayoutEffect } from 'react';
import { Dimensions } from 'react-native';

import { FlashList } from '@/core/components';
import { NFTS } from '@/core/constants/wallet';
import NFTItem, { NFTItemData } from '@/core/views/wallet/containers/NFTItem';

const { width } = Dimensions.get('window');
const NFT_ITEM_WIDTH = ((width - 32) - 24) / 3; 

export function NFTListView() {
  const navigation = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerSearchBarOptions: {
        placeholder: '搜索 NFT',
      },
    });
  }, [navigation]);

  return (
    <FlashList<NFTItemData>
      data={NFTS}
      renderItem={({ item }) => (
        <NFTItem item={item} width={NFT_ITEM_WIDTH} />
      )}
      keyExtractor={(item) => item.id}
      showsVerticalScrollIndicator={false}
      numColumns={3}
      contentContainerStyle={{ paddingTop: 16, paddingBottom: 24, paddingHorizontal: 16 }}
    />
  );
}
