import { useNavigation } from 'expo-router';
import { useLayoutEffect } from 'react';

import { useTheme } from '@/core/components';
import { HeaderLeft } from '@/core/views/header/HeaderLeft';
import { HeaderRight } from '@/core/views/header/HeaderRight';
import { HeaderTitle } from '@/core/views/header/HeaderTitle';

type LargeTitleHeaderOptions = {
  title: string;
  enabled?: boolean;
};

export const useLargeTitleHeader = ({ title, enabled = true }: LargeTitleHeaderOptions) => {
  const theme = useTheme();
  const navigation = useNavigation();

  const titleColor = theme.color.val;

  useLayoutEffect(() => {
    if (!enabled) return;

    navigation.setOptions({
      headerTitle: title,
      headerShown: true,
      headerTransparent: true,
      headerStyle: { backgroundColor: 'transparent' },
      headerShadowVisible: false,
      headerLeft: () => null,
      headerRight: () => null,
      headerBlurEffect: 'none',
    });
  }, [enabled, navigation, titleColor, title]);
}

type StickyWalletSelectorHeaderOptions = {
  enabled?: boolean;
};

export const useStickyWalletSelectorHeader = ({ enabled = true }: StickyWalletSelectorHeaderOptions = {}) => {
  const navigation = useNavigation();
  const theme = useTheme();

  const accentColor = theme.color.val;
  const backgroundColor = theme.background.val;

  useLayoutEffect(() => {
    if (!enabled) return;

    navigation.setOptions({
      headerShown: true,
      headerTitle: () => <HeaderTitle />,
      headerLeft: () => <HeaderLeft />,
      headerRight: () => <HeaderRight />,
      headerTintColor: accentColor,
      headerShadowVisible: false,
      backButtonDisplayMode: 'generic',
      headerLargeTitle: false,
      headerStyle: { backgroundColor },
      headerTransparent: true,
    });
  }, [accentColor, backgroundColor, enabled, navigation]);
};
