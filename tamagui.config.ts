import { defaultConfig } from '@tamagui/config/v4';
import { color as baseColor, themes as baseThemes, tokens as baseTokens } from '@tamagui/themes';
import { createTamagui, createTokens } from 'tamagui';

const light = {
  primary: '#FF9500'
};

const dark = {
  primary: '#FF9F0A'
};

const tokens = createTokens({
  ...baseTokens,
  color: {
    ...baseColor,
    primaryLight: light.primary,
    primaryDark: dark.primary,
  },
});

const themes = {
  ...baseThemes,
  light: {
    ...baseThemes.light,
    primary: tokens.color.primaryLight,
  },
  dark: {
    ...baseThemes.dark,
    primary: tokens.color.primaryDark,
  },
};


export const tamaguiConfig = createTamagui({
  ...defaultConfig,
  settings: {
    ...defaultConfig.settings,
    onlyAllowShorthands: false,
  },
  tokens,
  themes,
});

export default tamaguiConfig;

export type Conf = typeof tamaguiConfig;

declare module 'tamagui' {
  interface TamaguiCustomConfig extends Conf { }
}