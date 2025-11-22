import { StandardTabs } from './StandardTabs';
import { type RVNativeTabsProps, type TabItemConfig } from './types';

export function RVNativeTabs(props: RVNativeTabsProps) {
  return <StandardTabs {...props} />;
}

export { TabItemConfig };

