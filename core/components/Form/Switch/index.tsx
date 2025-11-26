import React from 'react';
import { Switch as TSwitch, SwitchProps as TSwitchProps, styled, useTheme } from 'tamagui';

export const StyledSwitch = styled(TSwitch, {
  backgroundColor: '$background3',
  borderWidth: 0,
  borderRadius: 100,
});

export const StyledThumb = styled(TSwitch.Thumb, {
  backgroundColor: '$color',
  animation: 'bouncy',
});

export type RVSwitchProps = {
  value?: boolean;
  onValueChange?: (value: boolean) => void;
} & Omit<TSwitchProps, 'checked' | 'onCheckedChange' | 'value'>;

export default function Switch({ value, onValueChange, ...props }: RVSwitchProps) {
  const theme = useTheme();

  return (
    <StyledSwitch
      checked={!!value}
      onCheckedChange={onValueChange}
      native
      nativeProps={{
        trackColor: { false: theme.background3.val, true: theme.primary.val },
        thumbColor: theme.color.val,
      }}
      {...props}
    >
      <StyledThumb animation='bouncy' />
    </StyledSwitch>
  );
}
