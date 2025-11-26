import { useNavigation } from 'expo-router';
import { useEffect, useMemo } from 'react';
import QRCode from 'react-native-qrcode-svg';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { ScrollView, Typography, View, XStack, YStack } from '@/core/components';
import { ADDRESS_NETWORKS } from '@/core/constants/wallet';

type Props = {
  networkId?: string;
};

function chunkString(str: string, length: number) {
  return str.match(new RegExp(`.{1,${length}}`, 'g')) || [];
}

export function ReceiveQRCodeView({ networkId }: Props) {
  const navigation = useNavigation();
  const { bottom, top } = useSafeAreaInsets();

  const network = useMemo(() => {
    if (!networkId) {
      return undefined;
    }

    return ADDRESS_NETWORKS.find((item) => item.id === networkId);
  }, [networkId]);

  const backgroundColor = '$backgroundModal';
  const contentContainerStyle = useMemo(
    () => ({
      paddingTop: top + 16,
      paddingHorizontal: 20,
      paddingBottom: bottom + 24,
      gap: 16,
    }),
    [bottom, top],
  );

  useEffect(() => {
    navigation.setOptions({
      title: network?.label ?? '接收地址',
      headerTransparent: true,
      headerShadowVisible: false,
      headerStyle: { backgroundColor: 'transparent' },
    });
  }, [navigation, network?.label]);

  const address = '0x5618207d27D78F09f61A5D92190d58c453feB4b7';
  const addressChunks = useMemo(() => {
    // Remove 0x prefix if present to chunk neatly, then add back or handle logic as needed.
    // Assuming 0x should be part of the first chunk or separate.
    // Here we chunk the whole string including 0x.
    return chunkString(address, 4);
  }, [address]);

  return (
    <ScrollView
      flex={1}
      backgroundColor={backgroundColor}
      contentContainerStyle={contentContainerStyle}
      keyboardShouldPersistTaps='handled'
      showsVerticalScrollIndicator={false}
    >
      <YStack alignItems='center' justifyContent='center' gap='$6' pt='$8'>
        <View bg='white' p='$4' borderRadius='$4'>
          <QRCode value={address} size={200} />
        </View>

        <YStack gap='$4' width='100%' alignItems='center'>
          <Typography.TextSecondary fontSize={14} color='$color11'>
            {network?.label} 账户地址
          </Typography.TextSecondary>

          <XStack flexWrap='wrap' gap='$2' justifyContent='center' width='100%'>
            {addressChunks.map((chunk, index) => (
              <View
                key={index}
                px='$2'
                py='$1'
                borderRadius='$2'
                backgroundColor={index % 3 === 0 ? '$background3' : 'transparent'}
              >
                <Typography.AddressPrimary fontSize={24} lineHeight={32} fontWeight='600'>
                  {chunk}
                </Typography.AddressPrimary>
              </View>
            ))}
          </XStack>
        </YStack>
      </YStack>
    </ScrollView>
  );
}
