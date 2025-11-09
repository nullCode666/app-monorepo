import { Link, useNavigation } from 'expo-router';
import { useLayoutEffect } from 'react';

import { Avatar, Pressable, Typography, XStack, YStack, useTheme } from '@/core/components';
import { Settings } from '@/core/components/icons';

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
      headerLeft: null,
      headerRight: null,
      headerBlurEffect: 'none',
    });
  }, [enabled, navigation, titleColor, title]);
}

function HeaderLeft() {
  return (
    <Link href='/device' asChild>
      <Pressable hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}>
        <XStack width={36} height={36} justifyContent='center' alignItems='center'>
          <Avatar.Token size='small' type='outline' backgroundColor='$green10' />
        </XStack>
      </Pressable>
    </Link>
  );
}

function HeaderTitle() {
  return (
    <Link asChild href='/device'>
      <XStack px='$1' justifyContent='flex-start' alignItems='center' flex={1} height={44}>
        <YStack maxWidth={200} height='100%' gap='$2' justifyContent='center'>
          <Typography.TextPrimary fontSize={20} lineHeight={20} numberOfLines={1}>
            piggy🐷存币账户
          </Typography.TextPrimary>
          <Typography.TextSecondary numberOfLines={1}>
            Wallet A
          </Typography.TextSecondary>
        </YStack>
      </XStack>
    </Link>
  );
}

function HeaderRight() {
  return (
    <Link asChild href='/settings'>
      <XStack width={36} height={36} justifyContent='center' alignItems='center'>
        <Settings size={24} />
      </XStack>
    </Link>
  );
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
      headerTitle: HeaderTitle,
      headerLeft: HeaderLeft,
      headerRight: HeaderRight,
      headerTintColor: accentColor,
      headerShadowVisible: false,
      backButtonDisplayMode: 'generic',
      headerLargeTitle: false,
      headerStyle: { backgroundColor },
      headerTransparent: true,
    });
  }, [accentColor, backgroundColor, enabled, navigation]);
};
