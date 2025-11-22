import { Link } from 'expo-router';
import { memo } from 'react';

import { XStack } from '@/core/components';
import { History as HistoryIcon } from '@/core/components/icons';

function HeaderRightComponent() {
  return (
    <Link asChild href='/list/history'>
      <XStack width={36} height={36} justifyContent='center' alignItems='center'>
        <HistoryIcon size={24} />
      </XStack>
    </Link>
  );
}

export const HeaderRight = memo(HeaderRightComponent);
