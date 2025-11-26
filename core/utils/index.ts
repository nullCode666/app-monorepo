import { osVersion } from 'expo-device';
import { Platform } from 'react-native';

import { router, type Href } from 'expo-router';
import * as WebBrowser from 'expo-web-browser';

export type LinkProps = string | Href;

export const openLink = (linkProps: LinkProps) => {
  if (typeof linkProps === 'object' || /^\//.test(linkProps)) {
    return router.push(linkProps);
  }

  if (/^https:/i.test(linkProps)) {
    return WebBrowser.openBrowserAsync(linkProps, {
      presentationStyle: WebBrowser.WebBrowserPresentationStyle.PAGE_SHEET,
      dismissButtonStyle: 'close',
    });
  }
};

function parseMajorIOSVersion(version: string | null | undefined): number | null {
  if (!version || typeof version !== 'string') return null;

  const majorString = version.split('.')[0];
  const major = Number(majorString);

  return Number.isFinite(major) ? major : null;
}

/**
 * Check if the iOS version is 26 or above.
 */
export function isIOS26OrAbove(): boolean {
  if (Platform.OS !== 'ios') return false;

  const major = parseMajorIOSVersion(osVersion);
  if (major === null) return false;

  return major >= 26;
}
