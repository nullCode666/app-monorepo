import { Link } from 'expo-router';
import { memo } from 'react';

import { Typography, XStack, YStack } from '@/core/components';

function HeaderTitleComponent() {
  return (
    <Link asChild href='/device'>
      <XStack px='$1' justifyContent='flex-start' alignItems='center' flex={1} height={44}>
        <YStack maxWidth={200} height='100%' gap='$2' justifyContent='center'>
          <Typography.TextPrimary fontSize={20} lineHeight={20} numberOfLines={1}>
            piggy🐷存币账户
          </Typography.TextPrimary>
          <Typography.TextSecondary numberOfLines={1}>
            Wallet A
          </Typography.TextSecondary>
        </YStack>
      </XStack>
    </Link>
  );
}

export const HeaderTitle = memo(HeaderTitleComponent);
