import { GlassView } from 'expo-glass-effect';
import { LinearGradient, type LinearGradientPoint } from 'expo-linear-gradient';
import React, { ReactNode } from 'react';
import { StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme } from 'tamagui';

import { Typography, View, XStack, YStack } from '@/core/components';

type GradientHeaderProps = {
  title: string;
  gradientColor?: string | string[] | null;
  gradientStart?: LinearGradientPoint;
  gradientEnd?: LinearGradientPoint;
  maskBottom?: boolean;
  rightItem?: ReactNode;
  leftItem?: ReactNode;
  children: ReactNode;
};

const HEADER_HEIGHT = 60;

const styles = StyleSheet.create({
  glassView: {
    width: 42,
    height: 42,
    borderRadius: 20,
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  linearGradient: {
    flex: 1,
  },
});

export function GradientHeader({
  title,
  gradientColor,
  gradientStart,
  gradientEnd,
  maskBottom,
  rightItem,
  leftItem,
  children,
}: GradientHeaderProps) {
  const insets = useSafeAreaInsets();
  const theme = useTheme();
  const defaultColor = theme.primary.val;

  const colors = (
    Array.isArray(gradientColor)
      ? gradientColor
      : [`${gradientColor || defaultColor}35`, `${gradientColor || defaultColor}10`, 'transparent']
  ) as [string, string, ...string[]];

  const start = gradientStart ?? { x: 0.5, y: 0 };
  const end = gradientEnd ?? { x: 0.5, y: 1 };

  return (
    <YStack flex={1} backgroundColor='$background'>
      {!!gradientColor && (
        <View position='absolute' top={0} left={0} right={0} height={450} zIndex={0} pointerEvents='none'>
          <LinearGradient colors={colors} style={styles.linearGradient} start={start} end={end} />
          {maskBottom && (
            <LinearGradient
              colors={['transparent', theme.background.val]}
              style={StyleSheet.absoluteFill}
              start={{ x: 0, y: 0.2 }}
              end={{ x: 0, y: 1 }}
            />
          )}
        </View>
      )}

      <YStack pt={insets.top} px='$4' zIndex={10}>
        <XStack justifyContent='space-between' alignItems='center' height={HEADER_HEIGHT}>
          <XStack flex={1} alignItems='center' justifyContent='flex-start'>
            {leftItem ? (
              leftItem
            ) : (
              <Typography.Text fontSize={28} fontWeight='700'>
                {title}
              </Typography.Text>
            )}
          </XStack>

          {/* Right: Liquid Glass Button Container */}
          {rightItem && (
            <GlassView
              style={[StyleSheet.absoluteFill, styles.glassView]}
              isInteractive={true}
              glassEffectStyle='regular'
            >
              {rightItem}
            </GlassView>
          )}
        </XStack>
      </YStack>
      <YStack flex={1} pb={insets.bottom}>
        {children}
      </YStack>
    </YStack>
  );
}
