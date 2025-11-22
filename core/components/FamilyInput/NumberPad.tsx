import Entypo from '@expo/vector-icons/Entypo';
import Ionicons from '@expo/vector-icons/Ionicons';
import React, { memo } from 'react';
import { Pressable } from 'react-native';
import { useTheme } from 'tamagui';

import * as Typography from '../Typography';
import View from '../View';

import { useScaleFont } from './hooks/useScaleFont';


interface NumberPadProps {
  onPress: (value: number) => void;
  onDelete?: () => void;
  onClear?: () => void;
  onDot?: () => void;
  showDot?: boolean;
}

const NumberPad: React.FC<NumberPadProps> = memo(
  ({ onPress, onDelete, onClear, onDot, showDot = true }) => {
    const scaleFont = useScaleFont();
    const theme = useTheme();
    const ripple = theme.color4.val;

    const renderButton = React.useCallback(
      (value: string) => {
        const isSpecialButton = value === 'delete' || value === 'clear';

        const handlePress = () => {
          if (value === 'delete') {
            onDelete?.();
          } else if (value === 'clear') {
            onClear?.();
          } else if (value === 'dot') {
            onDot?.();
          } else {
            onPress(parseInt(value));
          }
        };

        return (
          <Pressable
            key={value}
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
            }}
            onPress={handlePress}
            onLongPress={() => {
              if (value === 'delete') {
                onClear?.();
              }
            }}
          >
            {value === 'delete' ? (
              <Typography.Text fontSize={20} lineHeight={24}>
                <Ionicons name='chevron-back' size={24} color={theme.color.val} />
              </Typography.Text>
            ) : value === 'dot' ? (
              <Typography.Text fontSize={20} lineHeight={24}>
                <Entypo name='dot-single' size={24} color={theme.color.val} />
              </Typography.Text>
            ) : (
              <Typography.Text
                fontSize={scaleFont(26)}
                lineHeight={scaleFont(32)}
                color='$color'
              >
                {value}
              </Typography.Text>
            )}
          </Pressable>
        );
      },
      [onDelete, onClear, onPress, scaleFont, theme.color.val, ripple]
    );

    const numbers = [
      ['1', '2', '3'],
      ['4', '5', '6'],
      ['7', '8', '9'],
      [showDot ? 'dot' : '', '0', 'delete'],
    ];

    return (
      <View
        flex={1}
        p={8}
        width='100%'
        justifyContent='flex-end'
        minHeight={200}
        maxHeight={300}
      >
        {numbers.map((row, rowIndex) => (
          <View
            key={`row-${rowIndex}`}
            flexDirection='row'
            justifyContent='space-around'
            flex={1}
          >
            {row.map((value) =>
              value ? (
                renderButton(value)
              ) : (
                <View key='empty' flex={1} justifyContent='center' alignItems='center' />
              )
            )}
          </View>
        ))}
      </View>
    );
  }
);

export default NumberPad;

