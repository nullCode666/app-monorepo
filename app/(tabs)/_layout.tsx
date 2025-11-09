import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { useRouteInfo } from 'expo-router/build/hooks';
import { Icon, Label, NativeTabs, VectorIcon } from 'expo-router/unstable-native-tabs';
import { useMemo } from 'react';

import { useTheme } from '@/core/components';
import { useLargeTitleHeader, useStickyWalletSelectorHeader } from '@/core/hooks/useTabHeader';

export default () => {
  const t = useTheme();
  const { pathname } = useRouteInfo();

  const primaryColor = t.primary.val;
  const mutedIconColor = t.color10.val;
  const tabItemBackgroundColor = 'transparent';
  const normalizedPath = pathname?.toLowerCase() ?? '';

  const isDeveloperRoute = normalizedPath.startsWith('/developer');
  const isExploreRoute = normalizedPath.startsWith('/explore');
  const isWalletRoute = normalizedPath.startsWith('/wallet');
  const isTradeRoute = normalizedPath.startsWith('/trade');
  const useLargeHeader = isDeveloperRoute || isExploreRoute;

  const largeHeaderTitle = isDeveloperRoute ? 'Developer' : '';

  // Switch tab header behavior based on active pathname.
  useLargeTitleHeader({ title: largeHeaderTitle, enabled: useLargeHeader });
  useStickyWalletSelectorHeader({ enabled: isWalletRoute || isTradeRoute });

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
      labelVisibilityMode: 'auto' as const,
    };
  }, [mutedIconColor, primaryColor, tabItemBackgroundColor]);

  return (
    <NativeTabs {...tabsColorConfig}>
      <NativeTabs.Trigger name='developer'>
        <Icon
          sf={{ default: 'hammer', selected: 'hammer.fill' }}
          androidSrc={{
            default: <VectorIcon family={MaterialCommunityIcons} name='toolbox-outline' />,
            selected: <VectorIcon family={MaterialCommunityIcons} name='toolbox' />,
          }}
        />
        <Label>Developer</Label>
      </NativeTabs.Trigger>
      <NativeTabs.Trigger name='wallet'>
        <Icon
          sf={{ default: 'creditcard', selected: 'creditcard.fill' }}
          androidSrc={{
            default: <VectorIcon family={MaterialCommunityIcons} name='wallet-outline' />,
            selected: <VectorIcon family={MaterialCommunityIcons} name='wallet' />,
          }}
        />
        <Label>Wallet</Label>
      </NativeTabs.Trigger>

      <NativeTabs.Trigger name='trade'>
        <Icon
          sf={{ default: 'arrow.triangle.2.circlepath', selected: 'arrow.triangle.2.circlepath' }}
          androidSrc={{
            default: <VectorIcon family={MaterialCommunityIcons} name='swap-horizontal' />,
            selected: <VectorIcon family={MaterialCommunityIcons} name='swap-horizontal-bold' />,
          }}
        />
        <Label>Trade</Label>
      </NativeTabs.Trigger>

      <NativeTabs.Trigger name='explore' role='search'>
        <Icon
          sf={{ default: 'magnifyingglass', selected: 'magnifyingglass' }}
          androidSrc={{
            default: <VectorIcon family={MaterialCommunityIcons} name='compass-outline' />,
            selected: <VectorIcon family={MaterialCommunityIcons} name='compass' />,
          }}
        />
        <Label>Explore</Label>
      </NativeTabs.Trigger>
    </NativeTabs>

  );
}
