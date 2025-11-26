import { memo } from 'react';

import { Avatar, Button, Typography, XStack, YStack } from '@/core/components';
import { ChevronDown } from '@/core/components/icons';
import { openLink } from '@/core/utils';

function HeaderLeftComponent() {
  return (
    <XStack>
      <Button type='text' size='large' onPress={() => openLink('/device')} p='$2'>
        <XStack alignItems='center' gap='$2'>
          <XStack width={36} height={36} justifyContent='center' alignItems='center'>
            <Avatar.Token size='small' type='outline' backgroundColor='$green10' />
          </XStack>
          <XStack px='$1' justifyContent='flex-start' alignItems='center'>
            <YStack maxWidth={200} justifyContent='center' gap='$0.5'>
              <Typography.TextPrimary fontSize={20} fontWeight='600' numberOfLines={1}>
                🐷🐷存币账户
              </Typography.TextPrimary>
              <Typography.TextSecondary fontSize={12} numberOfLines={1}>
                Wallet A
              </Typography.TextSecondary>
            </YStack>
            <XStack ml='$2'>
              <ChevronDown size={16} color='$color10' />
            </XStack>
          </XStack>
        </XStack>
      </Button>
    </XStack>
  );
}

export const HeaderLeft = memo(HeaderLeftComponent);
