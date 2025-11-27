import { useNavigation } from 'expo-router';
import { useLayoutEffect } from 'react';

import { useTheme } from '@/core/components';
import { useNavigationHeaderStyle } from '@/core/hooks/navigation';
import { TradeHomeView } from '@/core/views/trade/TradeHomeView';

export default function TradeModalScreen() {
  const navigation = useNavigation();
  const navigationHeaderStyle = useNavigationHeaderStyle(true);
  const theme = useTheme();
  const backgroundColor = theme.backgroundModal.val;

  useLayoutEffect(() => {
    navigation.setOptions({
      title: 'Trade',
      ...navigationHeaderStyle,
      headerTransparent: false,
      headerShadowVisible: true,
      headerStyle: { backgroundColor },
    });
  }, [navigation, navigationHeaderStyle, backgroundColor]);

  return <TradeHomeView headerShown={false} />;
}
