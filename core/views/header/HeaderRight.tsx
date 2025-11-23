import { Link } from 'expo-router';
import { memo } from 'react';

import { XStack } from '@/core/components';
import { History as HistoryIcon, Settings as SettingsIcon } from '@/core/components/icons';

type Props = {
  mode?: 'history' | 'settings';
};

function HeaderRightComponent({ mode = 'history' }: Props) {
  const Icon = mode === 'settings' ? SettingsIcon : HistoryIcon;
  const href = mode === 'settings' ? '/settings' : '/list/history';

  return (
    <Link asChild href={href}>
      <XStack width={36} height={36} justifyContent='center' alignItems='center' borderRadius={18} bg='transparent'>
        <Icon size={24} color='$color' />
      </XStack>
    </Link>
  );
}

export const HeaderRight = memo(HeaderRightComponent);
