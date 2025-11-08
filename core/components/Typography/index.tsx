import { Platform } from 'react-native';
import { ColorTokens, Text as TGText, type TextProps as TGTextProps } from 'tamagui';

export const FONT_FAMILY_TEXT =
  Platform.select({ ios: 'System', android: 'sans-serif', default: 'System' }) ?? 'System';
export const FONT_FAMILY_NUMBER = FONT_FAMILY_TEXT;

const textBaseProps: TGTextProps = {
  fontFamily: FONT_FAMILY_TEXT as any,
  color: '$color',
  includeFontPadding: false,
  letterSpacing: 0,
};

const textProps: TGTextProps = {
  ...textBaseProps,
  fontSize: 17,
  lineHeight: 17,
};

const textHeadingProps: TGTextProps = {
  ...textBaseProps,
  fontSize: 42,
  lineHeight: 42,
  fontWeight: '700',
};

const textPrimaryProps: TGTextProps = {
  ...textBaseProps,
  fontSize: 17,
  lineHeight: 17,
  fontWeight: 500,
};

const textSecondaryProps: TGTextProps = {
  ...textBaseProps,
  color: '$color10',
  fontSize: 14,
  lineHeight: 14,
};

const numberBaseProps: TGTextProps = {
  ...textBaseProps,
  fontFamily: FONT_FAMILY_NUMBER as any,
  fontVariant: ['tabular-nums'],
};

const numberProps: TGTextProps = {
  ...numberBaseProps,
  fontSize: 17,
  lineHeight: 17,
};

const numberHeadingProps: TGTextProps = {
  ...numberBaseProps,
  fontSize: 48,
  lineHeight: 48,
  fontWeight: '700',
};

const numberPrimaryProps: TGTextProps = {
  ...numberBaseProps,
  fontSize: 17,
  lineHeight: 17,
  fontWeight: 500,
};

const numberSecondaryProps: TGTextProps = {
  ...numberBaseProps,
  color: '$color10',
  fontSize: 14,
  lineHeight: 14,
};

type TypographyProps = TGTextProps & {
  percentageChange?: number;
  valueChange?: number;
  wrapInBrackets?: boolean;
};

function getPositiveColor(isPositive: boolean): ColorTokens {
  return isPositive ? '$green10' : '$red10';
}

const createTypographyComponent = (baseProps: TGTextProps) => {
  function TypographyComponent({
    percentageChange,
    valueChange,
    wrapInBrackets,
    children,
    ...rest
  }: TypographyProps) {
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

    const { style, color, ...restProps } = rest;

    const mergedStyle = [
      baseProps.style,
      style,
    ].filter(Boolean) as TGTextProps['style'][];

    const finalContent = wrapInBrackets
      ? ['(', content, ')']
      : content;

    return (
      <TGText
        {...baseProps}
        {...(restProps as TGTextProps)}
        color={overrideColor ?? color ?? baseProps.color}
        style={mergedStyle.length ? mergedStyle : undefined}
      >
        {finalContent}
      </TGText>
    );
  }

  return TypographyComponent;
};

export const Text = createTypographyComponent(textProps);
export const TextHeading = createTypographyComponent(textHeadingProps);
export const TextPrimary = createTypographyComponent(textPrimaryProps);
export const TextSecondary = createTypographyComponent(textSecondaryProps);
export const Number = createTypographyComponent(numberProps);
export const NumberHeading = createTypographyComponent(numberHeadingProps);
export const NumberPrimary = createTypographyComponent(numberPrimaryProps);
export const NumberSecondary = createTypographyComponent(numberSecondaryProps);
