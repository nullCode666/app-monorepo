import React from 'react';

import { Typography } from '@/core/components';
import { GradientHeader } from '@/core/views/header/GradientHeader';

export function ExploreHomeView() {
  return (
    <GradientHeader
      title='Explore'
      gradientColor={['#B35635', '#8E3840', '#763A57']}
      gradientStart={{ x: 0, y: 0 }}
      gradientEnd={{ x: 1, y: 0 }}
      maskBottom
      rightItem={null}
    >
      <Typography.Text />
    </GradientHeader>
  );
}
