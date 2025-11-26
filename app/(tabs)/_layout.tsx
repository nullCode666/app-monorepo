import { RVNativeTabs, type TabItemConfig } from '@/core/components';
import { ArrowRightLeft, Search, User, Wallet } from '@/core/components/icons';

const TABS_CONFIG: TabItemConfig[] = [
  {
    name: 'wallet',
    label: 'Wallet',
    icon: Wallet,
    sfSymbol: { default: 'creditcard', selected: 'creditcard.fill' },
  },
  {
    name: 'trade',
    label: 'Trade',
    icon: ArrowRightLeft,
    sfSymbol: { default: 'arrow.triangle.2.circlepath', selected: 'arrow.triangle.2.circlepath' },
  },
  {
    name: 'explore',
    label: 'Explore',
    icon: Search,
    sfSymbol: { default: 'magnifyingglass', selected: 'magnifyingglass' },
  },
  {
    name: 'profile',
    label: 'Profile',
    icon: User,
    sfSymbol: { default: 'person', selected: 'person.fill' },
  },
];

export default () => {
  return <RVNativeTabs items={TABS_CONFIG} />;
};
