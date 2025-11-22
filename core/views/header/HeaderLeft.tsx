import { Link } from 'expo-router';
import { memo } from 'react';

import { Avatar, Pressable, XStack } from '@/core/components';

function HeaderLeftComponent() {
  return (
    <Link href='/device' asChild>
      <Pressable hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}>
        <XStack width={36} height={36} justifyContent='center' alignItems='center'>
          <Avatar.Token size='small' type='outline' backgroundColor='$green10' />
        </XStack>
      </Pressable>
    </Link>
  );
}

export const HeaderLeft = memo(HeaderLeftComponent);
