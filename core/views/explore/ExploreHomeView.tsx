import React from 'react';

import { Button, Typography, XStack } from '@/core/components';
import { Settings } from '@/core/components/icons';
import { openLink } from '@/core/utils';
import { GradientHeader } from '@/core/views/header/GradientHeader';

export function ExploreHomeView() {
  return (
    <GradientHeader
      title='Explore'
      rightItem={
        <XStack width={36} height={36} justifyContent='center' alignItems='center' borderRadius={18} bg='transparent'>
          <Button
            size='small'
            type='text'
            icon={<Settings size={24} color='$color' />}
            onPress={() => openLink('/settings')}
          />
        </XStack>
      }
    >
      <Typography.Text />
    </GradientHeader>
  );
}
