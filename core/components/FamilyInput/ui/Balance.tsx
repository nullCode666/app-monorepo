import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import React from 'react';
import { useTheme } from 'tamagui';

import { Pressable, Typography, View } from '@/core/components';

import { useScaleFont } from '../hooks/useScaleFont';

interface RecipientProps {
  onPress: () => void;
  balance: number;
}

const Balance: React.FC<RecipientProps> = ({ onPress, balance }) => {
  const theme = useTheme();
  const scaleFont = useScaleFont();

  const backgroundColor = theme.color3.val;
  const textColor = theme.color.val;

  const formattedBalance = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format;

  return (
    <View
      flexDirection='row'
      py={8}
      p={12}
      mx={16}
      borderRadius={16}
      gap={12}
      alignItems='center'
      backgroundColor='rgba(0,0,0,0.3)'
    >
      <View
        p={14}
        height='100%'
        borderRadius={10}
      >
        <Typography.Text>
          <FontAwesome6 name='sack-dollar' size={18} color={textColor} />
        </Typography.Text>
      </View>
      <View flex={1}>
        <Typography.Text
          fontSize={scaleFont(13)}
          opacity={0.5}
        >
          Balance
        </Typography.Text>
        <Typography.Text
          fontSize={scaleFont(18)}
          lineHeight={24}
          color='$color'
        >
          {formattedBalance(balance)}
        </Typography.Text>
      </View>
      <Pressable
        style={{
          paddingVertical: 8,
          paddingHorizontal: 16,
          borderRadius: 15,
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: textColor + '08',
        }}
        onPress={onPress}
      >
        <Typography.Text fontSize={scaleFont(14)}>Use Max</Typography.Text>
      </Pressable>
    </View>
  );
};

export default Balance;

