import { router, type Href } from 'expo-router';
import * as WebBrowser from 'expo-web-browser';

export type LinkProps = string | Href;

export const openLink = (linkProps: LinkProps) => {
  if (typeof linkProps === 'object' || /^\//.test(linkProps)) {
    
    return router.push(linkProps);
  }

  if (/^https:/i.test(linkProps)) {
    return WebBrowser.openBrowserAsync(
      linkProps,
      {
        presentationStyle: WebBrowser.WebBrowserPresentationStyle.PAGE_SHEET,
        dismissButtonStyle: 'close',
      },
    );
  }
}