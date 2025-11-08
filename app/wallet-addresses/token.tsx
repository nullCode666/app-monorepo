import { useLocalSearchParams } from 'expo-router';
import { useMemo } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { FlashList, ListItem, Typography, YStack } from '@/core/components';
import { ADDRESS_NETWORKS, type AddressNetworkAddress } from '@/core/constants/wallet';

function toParam(value?: string | string[]) {
  if (Array.isArray(value)) {
    return value[0];
  }

  return value;
}

export default function WalletAddressDetailScreen() {
  const { top, bottom } = useSafeAreaInsets();
  const { networkId: networkIdParam } = useLocalSearchParams<{ networkId?: string | string[] }>();

  const network = useMemo(() => {
    const networkId = toParam(networkIdParam);
    if (!networkId) {
      return undefined;
    }

    return ADDRESS_NETWORKS.find(item => item.id === networkId);
  }, [networkIdParam]);

  const contentStyle = useMemo(
    () => ({
      paddingHorizontal: 16,
      paddingTop: top + 16,
      paddingBottom: bottom + 32,
      gap: 16,
    }),
    [bottom, top]
  );

  const data = network?.addresses ?? [];

  const renderAddress = ({ item }: { item: AddressNetworkAddress }) => (
    <ListItem
      bodyLeftTop={<Typography.Text fontSize={16} fontWeight='600'>{item.name}</Typography.Text>}
      bodyLeftBottom={(
        <YStack gap='$1'>
          <Typography.TextSecondary fontSize={13}>
            {item.address}
          </Typography.TextSecondary>
          {item.note ? (
            <Typography.TextSecondary fontSize={12} color='$color11'>
              {item.note}
            </Typography.TextSecondary>
          ) : null}
        </YStack>
      )}
      borderRadius='$6'
      borderWidth={1}
      borderColor='$color4'
      px='$4'
      py='$3'
      bg='$backgroundModal'
    />
  );

  return (
    <FlashList
      data={data}
      renderItem={renderAddress}
      keyExtractor={item => item.id}
      contentContainerStyle={contentStyle}
      ListHeaderComponent={() => (
        <YStack gap='$2'>
          <Typography.Text fontSize={24} fontWeight='700'>
            {network?.label ?? '网络地址'}
          </Typography.Text>
          {network?.description ? (
            <Typography.Text color='$color11'>
              {network.description}
            </Typography.Text>
          ) : null}
          <Typography.TextSecondary color='$color11'>
            网络：{network?.network ?? '未知'}
          </Typography.TextSecondary>
        </YStack>
      )}
      ItemSeparatorComponent={() => <YStack height='$2' />}
      showsVerticalScrollIndicator={false}
      ListEmptyComponent={() => (
        <YStack gap='$2' pt='$4'>
          <Typography.Text color='$color11'>暂无可用地址。</Typography.Text>
        </YStack>
      )}
    />
  );
}


