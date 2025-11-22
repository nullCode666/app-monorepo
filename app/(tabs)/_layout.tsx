import { useRouteInfo } from 'expo-router/build/hooks';

import { RVNativeTabs, type TabItemConfig } from '@/core/components';
import { useLargeTitleHeader, useStickyWalletSelectorHeader } from '@/core/hooks/useTabHeader';

const TABS_CONFIG: TabItemConfig[] = [
  {
    name: 'wallet',
    sfSymbol: { default: 'creditcard', selected: 'creditcard.fill' },
    materialIcon: { default: 'wallet-outline', selected: 'wallet' },
  },
  {
    name: 'trade',
    sfSymbol: { default: 'arrow.triangle.2.circlepath', selected: 'arrow.triangle.2.circlepath' },
    materialIcon: { default: 'swap-horizontal', selected: 'swap-horizontal-bold' },
  },
  {
    name: 'profile',
    sfSymbol: { default: 'person', selected: 'person.fill' },
    materialIcon: { default: 'account-circle-outline', selected: 'account-circle' },
  },
  {
    name: 'explore',
    role: 'search',
    sfSymbol: { default: 'magnifyingglass', selected: 'magnifyingglass' },
    materialIcon: { default: 'compass-outline', selected: 'compass' },
  },
];

export default () => {
  const { pathname } = useRouteInfo();
  const normalizedPath = pathname?.toLowerCase() ?? '';

  const isProfileRoute = normalizedPath.startsWith('/profile');
  const isExploreRoute = normalizedPath.startsWith('/explore');
  const isWalletRoute = normalizedPath.startsWith('/wallet');
  const isTradeRoute = normalizedPath.startsWith('/trade');
  const useLargeHeader = isProfileRoute || isExploreRoute;

  const largeHeaderTitle = isProfileRoute ? 'Profile' : '';

  useLargeTitleHeader({ title: largeHeaderTitle, enabled: useLargeHeader });
  useStickyWalletSelectorHeader({ enabled: isWalletRoute || isTradeRoute });

  return <RVNativeTabs items={TABS_CONFIG} />;
};
