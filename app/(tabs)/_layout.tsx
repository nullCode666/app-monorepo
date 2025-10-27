import { Icon, Label, NativeTabs } from 'expo-router/unstable-native-tabs';
import { useMemo } from 'react';
import { useTheme } from 'tamagui';

export default () => {
  const t = useTheme();
  const primaryColor = t.primary.get();

  const tabsColorConfig = useMemo(() => {
    return {
      iconColor: {
        selected: primaryColor,
      },
      labelStyle: {
        selected: { color: primaryColor, fontWeight: '600' } as const,
      },
      indicatorColor: primaryColor,
      rippleColor: primaryColor,
    };
  }, [primaryColor])

  return (
    <NativeTabs {...tabsColorConfig}>
      <NativeTabs.Trigger name='developer'>
        <Icon
          sf={{ default: 'hammer', selected: 'hammer.fill' }}
          drawable='ic_dev_tools'
        />
        <Label>Developer</Label>
      </NativeTabs.Trigger>
      <NativeTabs.Trigger name='wallet'>
        <Icon
          sf={{ default: 'creditcard', selected: 'creditcard.fill' }}
          drawable='ic_wallet_outline'
        />
        <Label>Wallet</Label>
      </NativeTabs.Trigger>

      <NativeTabs.Trigger name='swap'>
        <Icon
          sf={{ default: 'arrow.triangle.2.circlepath', selected: 'arrow.triangle.2.circlepath' }}
          drawable='ic_swap'
        />
        <Label>Swap</Label>
      </NativeTabs.Trigger>

      <NativeTabs.Trigger name='explore' role='search'>
        <Icon
          sf={{ default: 'magnifyingglass', selected: 'magnifyingglass' }}
          drawable='ic_search'
        />
        <Label>Explore</Label>
      </NativeTabs.Trigger>
    </NativeTabs>

  );
}
