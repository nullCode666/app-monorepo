import { Pressable, Typography, View, XStack, YStack } from '@/core/components';
import { Link } from 'expo-router';

export type NFTItemData = {
  id: string;
  name: string;
  collection: string;
  backgroundColor: string;
  artworkLabel?: string;
  quantity?: string;
  badgeLabel?: string;
};

type NFTItemProps = {
  item: NFTItemData;
  width: number;
};

export default function NFTItem({ item, width }: NFTItemProps) {
  return (
    <Link href='/detail/nft' asChild>
      <Pressable>
        <YStack width={width} gap='$2' borderRadius='$2' mb='$4'>
          <View
            width={width}
            height={width}
            borderRadius={12}
            alignItems='center'
            justifyContent='center'
            style={{ backgroundColor: item.backgroundColor }}
          >
            {item.artworkLabel ? (
              <Typography.TextPrimary>{item.artworkLabel}</Typography.TextPrimary>
            ) : null}
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
  );
}
