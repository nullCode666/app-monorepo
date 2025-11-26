import { Tabs } from 'expo-router';
import { ColorTokens, useTheme } from 'tamagui';

import { type RVNativeTabsProps } from './types';

export function StandardTabs({ items }: RVNativeTabsProps) {
  const theme = useTheme();

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: theme.primary.val,
        tabBarInactiveTintColor: theme.color10.val,
        tabBarStyle: {
          backgroundColor: theme.background.val,
          borderTopColor: theme.borderColor.val,
        },
      }}
    >
      {items.map((item) => (
        <Tabs.Screen
          key={item.name}
          name={item.name}
          options={{
            title: item.label,
            tabBarLabel: item.label,
            tabBarIcon: ({ color }) => {
              const Icon = item.icon;
              return <Icon size={24} color={color as ColorTokens} />;
            },
          }}
        />
      ))}
    </Tabs>
  );
}
