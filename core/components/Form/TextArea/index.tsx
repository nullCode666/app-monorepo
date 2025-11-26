import React from 'react';
import { TextArea as TTextArea, type TextAreaProps as TTextAreaProps, styled } from 'tamagui';

const StyledTextArea = styled(TTextArea, {
  backgroundColor: '$background',
  borderWidth: 1,
  borderColor: '$color4',
  borderRadius: '$4',
  padding: '$2',
  width: '100%',
  textAlignVertical: 'top', // Ensure text starts at top on Android
  placeholderTextColor: '$color10',
  fontFamily: '$body',
  fontSize: '$4',
  focusStyle: {
    borderColor: '$color8',
    borderWidth: 1,
  },
});

export type TextAreaProps = Omit<TTextAreaProps, 'onChangeText'> & {
  onValueChange?: (value: string) => void;
};

export const TextArea = React.forwardRef<TTextArea, TextAreaProps>(({ onValueChange, numberOfLines = 3, ...props }, ref) => {
  return <StyledTextArea ref={ref} onChangeText={onValueChange} numberOfLines={numberOfLines} minHeight={100} {...props} />;
});

