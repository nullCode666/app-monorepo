import { defaultConfig } from '@tamagui/config/v4';
import { color as baseColor, themes as baseThemes, tokens as baseTokens } from '@tamagui/themes';
import { createFont, createTamagui, createTokens } from 'tamagui';

const light = {
  background: '#fff',
  backgroundModal: '#fafafc',
  background2: '#f2f2f7',
  background3: '#e5e5ea',
  primary: '#FF9500',
  green10: '#30d158', // Softer iOS Green
  red10: '#cd2b31',
  textPrimary: '#000000',
  textSecondary: '#8E8E93',
  cardBackground: '#ffffff',
};

const dark = {
  background: '#000000', // Pure Black
  backgroundModal: '#1C1C1E', // Dark Grey for cards/modals
  background2: '#1C1C1E', // Dark Grey for cards
  background3: '#2C2C2E', // Tertiary System Fill
  primary: '#FF9F0A',
  green10: '#30d158', // Softer iOS Green
  red10: '#ff6369',
  textPrimary: '#FFFFFF',
  textSecondary: '#8E8E93', // System Gray
  cardBackground: '#1C1C1E',
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
    
    textPrimaryLight: light.textPrimary,
    textPrimaryDark: dark.textPrimary,
    textSecondaryLight: light.textSecondary,
    textSecondaryDark: dark.textSecondary,
    
    cardBackgroundLight: light.cardBackground,
    cardBackgroundDark: dark.cardBackground,
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
    color: tokens.color.textPrimaryLight,
    color10: tokens.color.textSecondaryLight,
    cardBackground: tokens.color.cardBackgroundLight,
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
    color: tokens.color.textPrimaryDark,
    color10: tokens.color.textSecondaryDark,
    cardBackground: tokens.color.cardBackgroundDark,
  },
};

const quicksandFont = createFont({
  family: 'Quicksand',
  size: {
    1: 12,
    2: 14,
    3: 16,
    4: 18,
    5: 20,
    6: 24,
    7: 28,
    8: 32,
    9: 48,
    10: 64,
  },
  lineHeight: {
    1: 16,
    2: 20,
    3: 24,
    4: 26,
    5: 28,
    6: 32,
    7: 36,
    8: 40,
    9: 56,
    10: 72,
  },
  weight: {
    400: '400',
    700: '700',
  },
  letterSpacing: {
    400: 0,
    700: 0,
  },
  face: {
    400: { normal: 'Quicksand' },
    700: { normal: 'Quicksand-Bold' },
  },
});

const jetBrainsMonoFont = createFont({
  family: 'JetBrainsMono',
  size: {
    1: 12,
    2: 14,
    3: 16,
    4: 18,
    5: 20,
    6: 24,
    7: 28,
    8: 32,
    9: 48,
    10: 64,
  },
  lineHeight: {
    1: 16,
    2: 20,
    3: 24,
    4: 26,
    5: 28,
    6: 32,
    7: 36,
    8: 40,
    9: 56,
    10: 72,
  },
  weight: {
    400: '400',
    500: '500',
  },
  letterSpacing: {
    400: 0,
    500: 0,
  },
  face: {
    400: { normal: 'JetBrainsMono' },
    500: { normal: 'JetBrainsMono-SemiBold' },
  },
});

export const tamaguiConfig = createTamagui({
  ...defaultConfig,
  settings: {
    ...defaultConfig.settings,
    onlyAllowShorthands: false,
  },
  tokens,
  themes,
  fonts: {
    heading: quicksandFont,
    body: defaultConfig.fonts.body, // Keep default body font (System)
    mono: jetBrainsMonoFont,
  },
});

export default tamaguiConfig;

export type Conf = typeof tamaguiConfig;

declare module 'tamagui' {
  interface TamaguiCustomConfig extends Conf {
    readonly __tamaguiBrand?: never;
  }
}
