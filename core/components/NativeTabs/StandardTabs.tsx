import { Tabs } from 'expo-router';

import { FloatingBottomTabBar } from './components/FloatingBottomTabBar';
import { type RVNativeTabsProps } from './types';

export function StandardTabs({ items }: RVNativeTabsProps) {
  return (
    <Tabs
      tabBar={(props) => <FloatingBottomTabBar {...props} items={items} />}
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          position: 'absolute', 
        },
      }}
    >
      {items.map((item) => (
        <Tabs.Screen
          key={item.name}
          name={item.name}
          options={{
            title: item.name,
            
          }}
        />
      ))}
    </Tabs>
  );
}
