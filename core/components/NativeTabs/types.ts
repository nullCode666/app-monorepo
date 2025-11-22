import { type SFSymbol } from 'sf-symbols-typescript';

export type TabItemConfig = {
  name: string;
  role?: 'search';
  sfSymbol: {
    default: SFSymbol;
    selected: SFSymbol;
  };
  materialIcon: {
    default: string;
    selected: string;
  };
};

export type RVNativeTabsProps = {
  items: TabItemConfig[];
};
