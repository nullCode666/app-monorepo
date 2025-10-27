import dotenv from 'dotenv';

import type { ExpoConfig } from '@expo/config';

dotenv.config({ path: '.env.version', quiet: true });
dotenv.config({ path: '.env', quiet: true });

export default (): ExpoConfig => {
  const APP_VERSION = process.env.APP_VERSION!;
  const APP_BUILD_NUMBER = process.env.APP_BUILD_NUMBER!;

  return {
    name: 'Revault Wallet',
    slug: 'revault-wallet',
    owner: 'revault',
    version: APP_VERSION,
    orientation: 'portrait',
    icon: './core/assets/images/icon.png',
    scheme: 'revaultwallet',
    userInterfaceStyle: 'dark',
    newArchEnabled: true,
    ios: {
      buildNumber: String(APP_BUILD_NUMBER),
      supportsTablet: false,
      bundleIdentifier: 'one.revault.wallet',
      infoPlist: {
        NSCameraUsageDescription: 'We use the camera to scan QR codes.',
        NSFaceIDUsageDescription: 'Allow Face ID to unlock your wallet.',
        ITSAppUsesNonExemptEncryption: false,
      },
    },
    android: {
      versionCode: Number(APP_BUILD_NUMBER),
      adaptiveIcon: {
        backgroundColor: '#E6F4FE',
        foregroundImage: './core/assets/images/android-icon-foreground.png',
        backgroundImage: './core/assets/images/android-icon-background.png',
        monochromeImage: './core/assets/images/android-icon-monochrome.png',
      },
      edgeToEdgeEnabled: true,
      predictiveBackGestureEnabled: false,
      package: 'one.revault.wallet',
    },
    plugins: [
      'expo-font',
      'expo-router',
      'expo-web-browser',
      './app.plugin.js', /** rename apk */
    ],
    extra: {
      eas: {
        projectId: 'd0138da8-75b8-4819-876e-375018bf9dd7',
      },
    },
  };
}