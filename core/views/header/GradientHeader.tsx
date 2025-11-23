import { GlassView } from 'expo-glass-effect';
import { LinearGradient } from 'expo-linear-gradient';
import React, { ReactNode } from 'react';
import { StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme } from 'tamagui';

import { Typography, View, XStack, YStack } from '@/core/components';

type GradientHeaderProps = {
  title: string;
  gradientColor?: string;
  rightItem?: ReactNode;
  children: ReactNode;
};

export function GradientHeader({ title, gradientColor, rightItem, children }: GradientHeaderProps) {
  const insets = useSafeAreaInsets();
  const theme = useTheme();
  const color = gradientColor || theme.primary.val;

  return (
    <YStack flex={1} backgroundColor='$background'>
      <View position='absolute' top={0} left={0} right={0} height={450} zIndex={0} pointerEvents='none'>
        <LinearGradient
          colors={[`${color}35`, `${color}10`, 'transparent']}
          style={{ flex: 1 }}
          start={{ x: 0.5, y: 0 }}
          end={{ x: 0.5, y: 1 }}
        />
      </View>

      <YStack pt={insets.top} px='$4' zIndex={10}>
        <XStack justifyContent='space-between' alignItems='center'>
          {/* Left: Large Title */}
          <Typography.Text fontSize={28} fontWeight='700'>
            {title}
          </Typography.Text>

          {/* Right: Liquid Glass Button Container */}
          {rightItem && (
            <GlassView
              style={[
                StyleSheet.absoluteFill,
                {
                  width: 42,
                  height: 42,
                  borderRadius: 20,
                  position: 'relative',
                  justifyContent: 'center',
                  alignItems: 'center',
                  overflow: 'hidden',
                },
              ]}
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
