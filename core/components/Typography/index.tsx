import React, { forwardRef, type ComponentRef } from 'react';
import { Platform } from 'react-native';
import { ColorTokens, styled, Text as TGText, type TextProps as TGTextProps } from 'tamagui';

export const FONT_FAMILY_TEXT =
  Platform.select({ ios: 'System', android: 'sans-serif', default: 'System' }) ?? 'System';
export const FONT_FAMILY_NUMBER = 'JetBrainsMono';
export const FONT_FAMILY_HEADING = 'Quicksand';

const BaseText = styled(TGText, {
  fontFamily: FONT_FAMILY_TEXT as any,
  color: '$color',
  includeFontPadding: false,
  letterSpacing: 0,
});

const BaseNumber = styled(BaseText, {
  fontFamily: FONT_FAMILY_NUMBER as any,
  fontVariant: ['tabular-nums'],
});


const StyledText = styled(BaseText, {
  fontSize: 17,
  lineHeight: 22, 
});

const StyledTextHeading = styled(BaseText, {
  fontSize: 42,
  lineHeight: 50, 
  fontWeight: '700',
});

const StyledTextPrimary = styled(BaseText, {
  fontSize: 17,
  lineHeight: 22, 
  fontWeight: '500',
});

const StyledTextSecondary = styled(BaseText, {
  color: '$color10',
  fontSize: 14,
  lineHeight: 18, 
});

const StyledNumber = styled(BaseNumber, {
  fontSize: 17,
  lineHeight: 22, 
});

const StyledNumberHeading = styled(BaseNumber, {
  fontFamily: FONT_FAMILY_HEADING as any,
  fontSize: 54,
  lineHeight: 60, 
  fontWeight: '700',
});

const StyledNumberPrimary = styled(BaseNumber, {
  fontSize: 17,
  lineHeight: 22, 
  fontWeight: '500',
});

const StyledNumberSecondary = styled(BaseNumber, {
  color: '$color10',
  fontSize: 14,
  lineHeight: 18, 
  fontWeight: '500',
});

export type TypographyProps = TGTextProps & {
  percentageChange?: number;
  valueChange?: number;
  wrapInBrackets?: boolean;
};

function getPositiveColor(isPositive: boolean): ColorTokens {
  return isPositive ? '$green10' : '$red10';
}

function withValueFormatting(Component: typeof TGText) {
  return forwardRef<ComponentRef<typeof TGText>, TypographyProps>(({
    percentageChange,
    valueChange,
    wrapInBrackets,
    children,
    ...rest
  }, ref) => {
    let content = children;
    let overrideColor: ColorTokens | undefined;

    if (typeof percentageChange === 'number') {
      const isPositive = percentageChange >= 0;
      overrideColor = getPositiveColor(isPositive);
      const formatted = `${isPositive ? '+' : ''}${percentageChange.toFixed(2)}%`;
      content = formatted;
    } else if (typeof valueChange === 'number') {
      const isPositive = valueChange >= 0;
      overrideColor = getPositiveColor(isPositive);
      const magnitude = Math.abs(valueChange);
      const formatted = magnitude.toLocaleString(undefined, { maximumFractionDigits: 8 });
      content = `${isPositive ? '+' : '-'}${formatted}`;
    }

    const finalContent = wrapInBrackets
      ? ['(', content, ')']
      : content;

    return (
      <Component
        ref={ref}
        {...rest}
        color={overrideColor ?? rest.color}
      >
        {finalContent}
      </Component>
    );
  });
}

export const Text = withValueFormatting(StyledText);
export const TextHeading = withValueFormatting(StyledTextHeading);
export const TextPrimary = withValueFormatting(StyledTextPrimary);
export const TextSecondary = withValueFormatting(StyledTextSecondary);
export const Number = withValueFormatting(StyledNumber);
export const NumberHeading = withValueFormatting(StyledNumberHeading);
export const NumberPrimary = withValueFormatting(StyledNumberPrimary);
export const NumberSecondary = withValueFormatting(StyledNumberSecondary);
