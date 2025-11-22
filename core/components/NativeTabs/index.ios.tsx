import { LiquidTabs } from './LiquidTabs';
import { type RVNativeTabsProps, type TabItemConfig } from './types';

export function RVNativeTabs(props: RVNativeTabsProps) {
  return <LiquidTabs {...props} />;
}

export { TabItemConfig };
