import React, { forwardRef, type ComponentRef } from 'react';
import { Platform } from 'react-native';
import { ColorTokens, styled, Text as TGText, type GetThemeValueForKey, type TextProps as TGTextProps } from 'tamagui';

export const FONT_FAMILY_TEXT =
  Platform.select({ ios: 'System', android: 'sans-serif', default: 'System' }) ?? 'System';
export const FONT_FAMILY_NUMBER = 'JetBrainsMono';
export const FONT_FAMILY_HEADING = 'Quicksand';

const BaseText = styled(TGText, {
  fontFamily: FONT_FAMILY_TEXT as GetThemeValueForKey<'fontFamily'>,
  color: '$color',
  includeFontPadding: false,
  letterSpacing: 0,
});

const BaseNumber = styled(BaseText, {
  fontFamily: FONT_FAMILY_NUMBER as GetThemeValueForKey<'fontFamily'>,
  fontVariant: ['tabular-nums'],
});

const BaseAddress = styled(BaseText, {
  fontFamily: FONT_FAMILY_NUMBER as GetThemeValueForKey<'fontFamily'>,
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
  fontFamily: FONT_FAMILY_HEADING as GetThemeValueForKey<'fontFamily'>,
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
});

const StyledAddress = styled(BaseAddress, {
  fontSize: 17,
  lineHeight: 22,
});

const StyledAddressPrimary = styled(BaseAddress, {
  fontSize: 17,
  lineHeight: 22,
  fontWeight: '500',
});

const StyledAddressSecondary = styled(BaseAddress, {
  color: '$color10',
  fontSize: 14,
  lineHeight: 18,
});

export type TypographyProps = TGTextProps & {
  percentageChange?: number;
  valueChange?: number;
  wrapInBrackets?: boolean;
  short?: boolean;
};

function getPositiveColor(isPositive: boolean): ColorTokens {
  return isPositive ? '$green10' : '$red10';
}

function withValueFormatting(Component: typeof TGText) {
  return forwardRef<ComponentRef<typeof TGText>, TypographyProps>(
    ({ percentageChange, valueChange, wrapInBrackets, short, children, fontSize, lineHeight, ...rest }, ref) => {
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
      } else if (short && typeof children === 'string') {
        if (children.length > 10) {
          content = `${children.slice(0, 6)}...${children.slice(-4)}`;
        }
      }

      const finalContent = wrapInBrackets ? ['(', content, ')'] : content;
      const computedColor = overrideColor ?? rest.color;

      const computedLineHeight = typeof fontSize === 'number' ? fontSize * 1.2 : lineHeight;

      const finalProps: TGTextProps = { ...rest };
      if (computedColor) {
        finalProps.color = computedColor;
      }
      if (fontSize !== undefined) {
        finalProps.fontSize = fontSize;
      }
      if (computedLineHeight !== undefined) {
        finalProps.lineHeight = computedLineHeight;
      }

      return (
        <Component ref={ref} {...finalProps}>
          {finalContent}
        </Component>
      );
    },
  );
}

export const Text = withValueFormatting(StyledText);
export const TextHeading = withValueFormatting(StyledTextHeading);
export const TextPrimary = withValueFormatting(StyledTextPrimary);
export const TextSecondary = withValueFormatting(StyledTextSecondary);
export const Number = withValueFormatting(StyledNumber);
export const NumberHeading = withValueFormatting(StyledNumberHeading);
export const NumberPrimary = withValueFormatting(StyledNumberPrimary);
export const NumberSecondary = withValueFormatting(StyledNumberSecondary);
export const Address = withValueFormatting(StyledAddress);
export const AddressPrimary = withValueFormatting(StyledAddressPrimary);
export const AddressSecondary = withValueFormatting(StyledAddressSecondary);
