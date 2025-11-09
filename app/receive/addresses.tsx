import { useLocalSearchParams, useNavigation } from 'expo-router';
import { useEffect, useMemo } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { ListItem, ScrollView, Typography, View, YStack, useTheme } from '@/core/components';
import { ADDRESS_NETWORKS } from '@/core/constants/wallet';

function toParam(value?: string | string[]) {
  if (Array.isArray(value)) {
    return value[0];
  }

  return value;
}

export default function ReceiveAddressesScreen() {
  const navigation = useNavigation();
  const { networkId: networkIdParam } = useLocalSearchParams<{ networkId?: string | string[] }>();
  const { bottom, top } = useSafeAreaInsets();
  const theme = useTheme();

  const network = useMemo(() => {
    const networkId = toParam(networkIdParam);
    if (!networkId) {
      return undefined;
    }

    return ADDRESS_NETWORKS.find(item => item.id === networkId);
  }, [networkIdParam]);

  const backgroundColor = theme.background.val;
  const contentContainerStyle = useMemo(() => ({
    paddingTop: top + 16,
    paddingHorizontal: 20,
    paddingBottom: bottom + 24,
    gap: 16,
  }), [bottom, top]);

  useEffect(() => {
    navigation.setOptions({
      title: network?.label ?? '接收地址',
      headerTransparent: true,
      headerShadowVisible: false,
      headerStyle: { backgroundColor: 'transparent' },
    });
  }, [navigation, network?.label]);

  const data = network?.addresses ?? [];

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor }}
      contentContainerStyle={contentContainerStyle}
      keyboardShouldPersistTaps='handled'
      showsVerticalScrollIndicator={false}
    >
      <YStack gap='$2'>
        <Typography.Text fontSize={28} fontWeight='700'>接收地址</Typography.Text>
        {network?.description ? (
          <Typography.TextSecondary color='$color11'>{network.description}</Typography.TextSecondary>
        ) : null}
        <Typography.TextSecondary color='$color11'>网络：{network?.network ?? '未知'}</Typography.TextSecondary>
      </YStack>

      {data.map((item, index) => (
        <View key={item.id}>
          {index > 0 ? <View height={1} bg='$color6' opacity={0.8} marginVertical='$2' /> : null}
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
        </View>
      ))}
    </ScrollView>
  );
}
