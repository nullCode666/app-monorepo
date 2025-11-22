import React from 'react';
import { Input as TInput, type InputProps as TInputProps, styled } from 'tamagui';

import XStack from '../../XStack';

export const StyledInput = styled(TInput, {
  backgroundColor: '$background',
  borderWidth: 1,
  borderColor: '$color4',
  borderRadius: '$4',
  height: 44,
  paddingHorizontal: '$3',
  width: '100%',
  focusStyle: {
    borderColor: '$color8',
    borderWidth: 1,
  },
});

export type InputProps = TInputProps & {
  leftIcon?: React.ComponentType<any>;
};

export function Input({ leftIcon: LeftIcon, ...props }: InputProps) {
  if (LeftIcon) {
    return (
      <XStack alignItems='center' width='100%' position='relative'>
        <XStack position='absolute' left='$3' zIndex={1} pointerEvents='none'>
          <LeftIcon size={20} color='$color10' />
        </XStack>
        <StyledInput {...props} paddingLeft='$8' />
      </XStack>
    );
  }

  return <StyledInput {...props} />;
}

