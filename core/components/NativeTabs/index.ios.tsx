import * as Device from 'expo-device';

import { LiquidTabs } from './LiquidTabs';
import { StandardTabs } from './StandardTabs';
import { type RVNativeTabsProps, type TabItemConfig } from './types';

export function RVNativeTabs(props: RVNativeTabsProps) {
  const osVersion = Device.osVersion || '0';

  const majorVersion = parseInt(osVersion.split('.')[0], 10);

  if (majorVersion > 18) {
    return <LiquidTabs {...props} />;
  }

  return <StandardTabs {...props} />;
}

export { TabItemConfig };
