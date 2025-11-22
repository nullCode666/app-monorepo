import { Icon, Label, NativeTabs } from 'expo-router/unstable-native-tabs';
import { useMemo } from 'react';
import { useTheme } from 'tamagui';

import { type RVNativeTabsProps } from './types';


export function LiquidTabs({ items }: RVNativeTabsProps) {
  const theme = useTheme();
  const primaryColor = theme.primary.val;
  const mutedIconColor = theme.color10.val;
  const tabItemBackgroundColor = 'transparent';

  const tabsColorConfig = useMemo(() => {
    return {
      iconColor: {
        default: mutedIconColor,
        selected: primaryColor,
      },
      labelStyle: {
        selected: { color: primaryColor },
      },
      indicatorColor: tabItemBackgroundColor,
      rippleColor: tabItemBackgroundColor,
      
      labelVisibilityMode: 'unlabeled' as const,
    };
  }, [mutedIconColor, primaryColor, tabItemBackgroundColor]);

  return (
    <NativeTabs {...tabsColorConfig}>
      {items.map((item) => (
        <NativeTabs.Trigger key={item.name} name={item.name} role={item.role}>
          <Label hidden />
          <Icon
            sf={{ default: item.sfSymbol.default, selected: item.sfSymbol.selected }}
          />
        </NativeTabs.Trigger>
      ))}
    </NativeTabs>
  );
}
