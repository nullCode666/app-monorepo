import type { IconProps } from '@tamagui/helpers-icon';
import React from 'react';
import { type SFSymbol } from 'sf-symbols-typescript';
export type TabItemConfig = {
  name: string;
  label: string;
  role?: 'search';
  icon: React.ComponentType<IconProps>;
  sfSymbol: {
    default: SFSymbol;
    selected: SFSymbol;
  };
};

export type RVNativeTabsProps = {
  items: TabItemConfig[];
};
