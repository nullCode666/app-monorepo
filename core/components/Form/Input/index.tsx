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

export type InputProps = Omit<TInputProps, 'onChangeText'> & {
  leftIcon?: React.ComponentType<any>;
  onValueChange?: (value: string) => void;
};

export const Input = React.forwardRef<TInput, InputProps>(({ leftIcon: LeftIcon, onValueChange, ...props }, ref) => {
  const inputElement = <StyledInput ref={ref} onChangeText={onValueChange} {...props} />;

  if (LeftIcon) {
    return (
      <XStack alignItems='center' width='100%' position='relative'>
        <XStack position='absolute' left='$3' zIndex={1} pointerEvents='none'>
          <LeftIcon size={20} color='$color10' />
        </XStack>
        {React.cloneElement(inputElement as any, { paddingLeft: '$8' })}
      </XStack>
    );
  }

  return inputElement;
});
