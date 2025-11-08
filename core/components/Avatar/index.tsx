import {
  createElement,
  isValidElement,
  type ElementType,
  type ReactNode
} from 'react';

import { LinkProps, openLink } from '../../utils';
import BaseImage from '../Image';
import Pressable from '../Pressable';
import * as Typography from '../Typography';
import View from '../View';
import YStack from '../YStack';

import type { ColorTokens } from 'tamagui';

export type AvatarIconType = 'default' | 'primary' | 'outline';
export type AvatarIconSize = 'tiny' | 'small' | 'default';

type AvatarContent = string | ElementType | ReactNode;

export type AvatarTokenProps = {
  label?: string;
  media?: AvatarContent;
  cornerMedia?: AvatarContent;
  link?: LinkProps;
  type?: AvatarIconType;
  size?: AvatarIconSize;
  backgroundColor?: ColorTokens;
  labelColor?: ColorTokens;
  shape?: 'circle' | 'rounded';
};

const COLORS = {
  default: {
    background: '$background2',
    icon: '$color11',
  },
  primary: {
    background: '$primary',
    icon: '$color',
  },
  outline: {
    background: 'transparent' as ColorTokens,
    icon: '$color11',
  },
} as const;

const SIZE_PRESETS = {
  tiny: {
    container: 24,
    icon: 14,
    label: 10,
    symbol: 12,
    roundedRadius: 6,
    cornerContainerSize: 14,
    cornerSize: 10,
    cornerBorderRadius: 4,
  },
  small: {
    container: 32,
    icon: 20,
    label: 12,
    symbol: 12,
    cornerContainerSize: 18,
    cornerSize: 14,
    cornerBorderRadius: 4,
    roundedRadius: 8,
  },
  default: {
    container: 52,
    icon: 28,
    label: 13,
    symbol: 18,
    cornerContainerSize: 24,
    cornerSize: 18,
    cornerBorderRadius: 8,
    roundedRadius: 12,
  },
} as const;

type RenderOptions = {
  content?: AvatarContent;
  size: number;
  color: ColorTokens;
};

function renderMedia({ content, size, color }: RenderOptions): ReactNode {
  if (!content) {
    return null;
  }

  if (typeof content === 'string') {
    return (
      <BaseImage src={content} />
    );
  }

  if (isValidElement(content)) {
    return content;
  }

  if (typeof content === 'function') {
    return createElement(content as ElementType, { size, color });
  }

  return content;
}

export function Token({
  label,
  media,
  cornerMedia,
  link,
  type = 'default',
  size = 'default',
  backgroundColor,
  labelColor,
  shape = 'circle',
}: AvatarTokenProps) {
  const preset = SIZE_PRESETS[size];

  const colors = COLORS[type];
  const resolvedBackground: ColorTokens = backgroundColor ?? colors.background;
  const resolvedForeground: ColorTokens = labelColor ?? colors.icon;
  const containerRadius = shape === 'circle' ? preset.container / 2 : preset.roundedRadius;

  const primaryContent = renderMedia({
    content: media,
    size: preset.icon,
    color: resolvedForeground,
  });

  const cornerContent = renderMedia({
    content: cornerMedia,
    size: preset.cornerSize,
    color: resolvedForeground,
  });

  const circle = (
    <View
      height={preset.container}
      width={preset.container}
      borderRadius={containerRadius}
      backgroundColor={resolvedBackground}
      position='relative'
    >
      <View
        overflow='hidden'
        width='100%'
        height='100%'
        justifyContent='center'
        alignItems='center'
        borderRadius={containerRadius}
      >
        {primaryContent}
      </View>
      {cornerContent ? (
        <View
          position='absolute'
          right={-4}
          bottom={0}
          width={preset.cornerContainerSize}
          height={preset.cornerContainerSize}
          borderRadius={preset.cornerBorderRadius}
          alignItems='center'
          justifyContent='center'
          borderWidth={2}
          backgroundColor='$background3'
          borderColor='$background3'
          overflow='hidden'
        >
          {cornerContent}
        </View>
      ) : null}
    </View>
  );

  const content = label ? (
    <YStack alignItems='center' gap='$2'>
      {circle}
      <Typography.TextSecondary fontSize={preset.label} lineHeight={preset.label} color={labelColor ?? '$color11'}>
        {label}
      </Typography.TextSecondary>
    </YStack>
  ) : circle;

  if (!link) return content;

  return <Pressable onPress={() => openLink(link)}>{content}</Pressable>;
}
