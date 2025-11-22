import { router } from 'expo-router';
import { useCallback } from 'react';
import { PixelRatio, Pressable, StyleSheet, } from 'react-native';
import Animated, { useAnimatedStyle, withTiming } from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme } from 'tamagui';

import { ScrollView, Typography, View } from '@/core/components';
import AnimatedText from '@/core/components/FamilyInput/AnimatedText';
import useNumber from '@/core/components/FamilyInput/hooks/useNumber';
import NumberPad from '@/core/components/FamilyInput/NumberPad';
import Balance from '@/core/components/FamilyInput/ui/Balance';
import Recipient from '@/core/components/FamilyInput/ui/Recipient';

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

type Props = {
  tokenId?: string;
  tokenSymbol?: string;
  tokenName?: string;
  networkId?: string;
  networkLabel?: string;
};

export function SendAmountFormView({ tokenId, tokenSymbol, tokenName, networkId, networkLabel }: Props) {
  const { top, bottom } = useSafeAreaInsets();
  const theme = useTheme();
  const textColor = theme.color.val;
  const bgColor = theme.background.val;
  const rippleColor = theme.color4.val;

  const {
    displayValue,
    appendDigit,
    addDecimalPoint,
    replaceDigit,
    deleteDigit,
    clearAll,
  } = useNumber();

  const buttonAnimatedStyle = useAnimatedStyle(() => {
    return {
      backgroundColor: withTiming(
        parseFloat(displayValue) === 0 ? textColor + '70' : textColor,
        { duration: 120 }
      ),
    };
  });

  const handleProceed = useCallback(() => {
    if (!tokenId || !tokenSymbol) {
      router.replace('/send');
      return;
    }

    router.push({
      pathname: '/send-confirm',
      params: {
        tokenId,
        tokenSymbol,
        tokenName,
        networkId,
        networkLabel,
        amount: displayValue,
      },
    });
  }, [networkId, networkLabel, tokenId, tokenName, tokenSymbol, displayValue]);

  return (
    <View pt={top} pb={bottom} flex={1} justifyContent='center'>
      <ScrollView
        contentContainerStyle={styles.screen}
        style={{ flex: 1, width: '100%' }}
        showsVerticalScrollIndicator={false}
      >
        <Recipient names={['Wallet 2']} />
        <View flex={1} justifyContent='center' alignItems='center'>
          <AnimatedText size={76} style={[styles.textStyle, { color: textColor }]}>
            {displayValue}
          </AnimatedText>
        </View>
        <Balance
          balance={123.45} 
          onPress={() => {
            replaceDigit(123.45);
          }}
        />
      </ScrollView>

      <NumberPad
        onPress={(digit) => {
          appendDigit(digit);
        }}
        onDot={() => {
          addDecimalPoint();
        }}
        onClear={() => {
          clearAll();
        }}
        onDelete={() => {
          deleteDigit();
        }}
      />

      <View
        pt='$2'
        pb='$2'
        px='$3'
        alignItems='center'
        width='100%'
      >
        <AnimatedPressable
          style={[
            styles.continue,
            buttonAnimatedStyle,
          ]}
          onPress={handleProceed}
          disabled={parseFloat(displayValue) === 0}
          android_ripple={{ color: rippleColor }}
        >
          <Typography.Text style={{ color: bgColor }}>下一步</Typography.Text>
        </AnimatedPressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  textStyle: {
    fontSize: PixelRatio.getPixelSizeForLayoutSize(32),
    fontFamily: 'QuicksandBold',
    lineHeight: 100,
  },
  screen: {
    width: '100%',
    flexGrow: 1,
    paddingVertical: 12,
  },
  continue: {
    marginBottom: 24,
    marginTop: 12,
    height: 52,
    width: '100%',
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
});
