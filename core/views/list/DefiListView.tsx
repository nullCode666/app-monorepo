import { useNavigation } from 'expo-router';
import { useLayoutEffect } from 'react';

import { FlashList, Typography, XStack, YStack } from '@/core/components';
import type { ActivityRow } from '@/core/constants/wallet';
import { DEFI_ACTIVITY } from '@/core/constants/wallet';
import type { DefiActivityItemData } from '@/core/views/wallet/containers/DefiActivityItem';
import DefiActivityItem from '@/core/views/wallet/containers/DefiActivityItem';

export function DefiListView() {
  const navigation = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerSearchBarOptions: {
        placeholder: '搜索 DeFi',
      },
    });
  }, [navigation]);

  return (
    <FlashList<ActivityRow>
      data={DEFI_ACTIVITY.filter((item) => item.type === 'item')}
      renderItem={({ item }) => <DefiActivityItem item={item as DefiActivityItemData} />}
      keyExtractor={(item) => item.id}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 24 }}
      ListHeaderComponent={() => (
        <YStack gap='$6' py='$6' mb='$2' borderBottomWidth={1} borderColor='$background2'>
          <XStack justifyContent='center' alignItems='center' flex={1}>
            <YStack gap='$1' alignItems='center' flex={1}>
              <Typography.NumberHeading flexWrap='wrap'>$5,678.90</Typography.NumberHeading>
            </YStack>
          </XStack>
        </YStack>
      )}
    />
  );
}
