import React from 'react';
import { useTheme } from 'tamagui';

import { Typography, View } from '@/core/components';

import { useScaleFont } from '../hooks/useScaleFont';

interface RecipientProps {
  names: string[];
}

const Recipient: React.FC<RecipientProps> = ({ names }) => {
  const theme = useTheme();
  const scaleFont = useScaleFont();

  return (
    <View
      flexDirection='row'
      py={8}
      px={12}
      mx={16}
      borderRadius={15}
      my={8}
      alignItems='center'
      backgroundColor='rgba(0,0,0,0.3)'
    >
      <Typography.Text
        mr={6}
        fontSize={scaleFont(13)}
        opacity={0.5}
        p={4}
      >
        To:
      </Typography.Text>
      <View flexDirection='row' flexWrap='wrap' gap={2}>
        {names.map((name, index) => (
          <Typography.Text
            key={index}
            fontSize={scaleFont(13)}
            mr={4}
            px={12}
            py={6}
            borderRadius={8}
            style={{ backgroundColor: theme.color.val + '08' }}
          >
            {name}
          </Typography.Text>
        ))}
      </View>
    </View>
  );
};

export default Recipient;

