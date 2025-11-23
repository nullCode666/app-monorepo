import { RVNativeTabs, type TabItemConfig } from '@/core/components';

const TABS_CONFIG: TabItemConfig[] = [
  {
    name: 'wallet',
    label: 'Wallet',
    sfSymbol: { default: 'creditcard', selected: 'creditcard.fill' },
    materialIcon: { default: 'wallet-outline', selected: 'wallet' },
  },
  {
    name: 'trade',
    label: 'Trade',
    sfSymbol: { default: 'arrow.triangle.2.circlepath', selected: 'arrow.triangle.2.circlepath' },
    materialIcon: { default: 'swap-horizontal', selected: 'swap-horizontal-bold' },
  },
  {
    name: 'profile',
    label: 'Profile',
    sfSymbol: { default: 'person', selected: 'person.fill' },
    materialIcon: { default: 'account-circle-outline', selected: 'account-circle' },
  },
  {
    name: 'explore',
    label: 'Explore',
    role: 'search',
    sfSymbol: { default: 'magnifyingglass', selected: 'magnifyingglass' },
    materialIcon: { default: 'compass-outline', selected: 'compass' },
  },
];

export default () => {
  return <RVNativeTabs items={TABS_CONFIG} />;
};
