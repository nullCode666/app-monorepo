import { Icon, Label, NativeTabs } from 'expo-router/unstable-native-tabs';
import { useMemo } from 'react';
import { useTheme } from 'tamagui';

import { type RVNativeTabsProps } from './types';

export function LiquidTabs({ items }: RVNativeTabsProps) {
  const theme = useTheme();
  const primaryColor = theme.primary.val;
  const mutedIconColor = theme.color10.val;
  const tabItemBackgroundColor = theme.background.val;

  const tabsColorConfig = useMemo(() => {
    return {
      iconColor: {
        default: mutedIconColor,
        selected: primaryColor,
      },
      labelStyle: {
        selected: { color: primaryColor },
      },
      backgroundColor: tabItemBackgroundColor,
      indicatorColor: tabItemBackgroundColor,
      rippleColor: tabItemBackgroundColor,
      disableTransparentOnScrollEdge: true,
    };
  }, [mutedIconColor, primaryColor, tabItemBackgroundColor]);

  return (
    <NativeTabs {...tabsColorConfig}>
      {items.map((item) => {
        return (
          <NativeTabs.Trigger key={item.name} name={item.name} role={item.role}>
            <Label>{item.label}</Label>
            <Icon sf={{ default: item.sfSymbol.default, selected: item.sfSymbol.selected }} />
          </NativeTabs.Trigger>
        );
      })}
    </NativeTabs>
  );
}
