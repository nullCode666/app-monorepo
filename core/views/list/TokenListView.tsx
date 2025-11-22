import { useNavigation } from 'expo-router';
import { useLayoutEffect } from 'react';

import { FlashList, Typography, XStack, YStack } from '@/core/components';
import { TOKEN_LIST } from '@/core/constants/wallet';
import TokenItem, { TokenItemData } from '@/core/views/wallet/containers/TokenItem';

export function TokenListView() {
  const navigation = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerSearchBarOptions: {
        placeholder: '搜索 Token',
      },
    });
  }, [navigation]);

  return (
    <FlashList<TokenItemData>
      data={TOKEN_LIST}
      renderItem={({ item }) => (
        <TokenItem token={item} />
      )}
      keyExtractor={(item) => item.id}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 24 }}
      ListHeaderComponent={() => (
        <YStack
          gap='$6'
          py='$6'
          mb='$2'
          borderBottomWidth={1}
          borderColor='$background2'
        >
          <XStack justifyContent='center' alignItems='center' flex={1}>
            <YStack gap='$1' alignItems='center' flex={1}>
              <Typography.NumberHeading flexWrap='wrap'>
                $12,345.67
              </Typography.NumberHeading>
            </YStack>
          </XStack>
        </YStack>
      )}
    />
  );
}
