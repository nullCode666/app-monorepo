import { defaultConfig } from '@tamagui/config/v4';
import { color as baseColor, themes as baseThemes, tokens as baseTokens } from '@tamagui/themes';
import { createTamagui, createTokens } from 'tamagui';

const light = {
  background: '#fff',
  backgroundModal: '#fafafc',
  background2: '#f2f2f7',
  background3: '#e5e5ea',
  primary: '#FF9500',
  green10: '#30a46c',
  red10: '#cd2b31',
};

const dark = {
  background: '#000',
  backgroundModal: '#0e0e0f',
  background2: '#1c1c1e',
  background3: '#2c2c2e',
  primary: '#FF9F0A',
  green10: '#30a46c',
  red10: '#ff6369',
};

const tokens = createTokens({
  ...baseTokens,
  color: {
    ...baseColor,
    backgroundLight: light.background,
    backgroundDark: dark.background,
    backgroundModalLight: light.backgroundModal,
    backgroundModalDark: dark.backgroundModal,
    background2Light: light.background2,
    background2Dark: dark.background2,
    background3Light: light.background3,
    background3Dark: dark.background3,
    primaryLight: light.primary,
    primaryDark: dark.primary,

    green10Light: light.green10,
    green10Dark: dark.green10,
    red10Light: light.red10,
    red10Dark: dark.red10,
  },
});

const themes = {
  ...baseThemes,
  light: {
    ...baseThemes.light,
    background: tokens.color.backgroundLight,
    backgroundModal: tokens.color.backgroundModalLight,
    background2: tokens.color.background2Light,
    background3: tokens.color.background3Light,
    primary: tokens.color.primaryLight,
    green10: tokens.color.green10Light,
    red10: tokens.color.red10Light,
  },
  dark: {
    ...baseThemes.dark,
    background: tokens.color.backgroundDark,
    backgroundModal: tokens.color.backgroundModalDark,
    background2: tokens.color.background2Dark,
    background3: tokens.color.background3Dark,
    primary: tokens.color.primaryDark,
    green10: tokens.color.green10Dark,
    red10: tokens.color.red10Dark,
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