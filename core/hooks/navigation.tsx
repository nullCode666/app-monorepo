import { useTheme } from '@/core/components';
import type { NativeStackNavigationOptions } from '@react-navigation/native-stack';
import { isIOS26OrAbove } from '../utils';

export function useNavigationHeaderStyle(isModal?: boolean): NativeStackNavigationOptions {
  const theme = useTheme();
  const backgroundColor = theme.background.val;
  const backgroundModalColor = theme.backgroundModal.val;

  if (isIOS26OrAbove()) {
    return {
      headerTransparent: true,
      headerShadowVisible: false,
    };
  }

  return {
    headerTransparent: false,
    headerShadowVisible: true,
    headerStyle: {
      backgroundColor: isModal ? backgroundModalColor : backgroundColor,
    },
  };
}
