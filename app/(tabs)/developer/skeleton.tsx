import { MotiView } from 'moti';
import { Skeleton } from 'moti/skeleton';
import { useColorScheme } from 'react-native';
import { styled } from 'tamagui';

import { YStack } from '@/core/components';

const AnimatedContainer = styled(MotiView, {
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
  padding: '$4',
});

export default function SkeletonScreen() {
  const colorScheme = useColorScheme()!;

  return (
    <AnimatedContainer
      animate={{ backgroundColor: colorScheme === 'dark' ? '#000000' : '#ffffff' }}
    >
      <YStack gap='$2' alignItems='center' width='100%'>
        <Skeleton colorMode={colorScheme} radius='round' height={75} width={75} />
        <Skeleton colorMode={colorScheme} width={250} />
        <YStack width='100%' gap='$2'>
          <Skeleton colorMode={colorScheme} width='100%' />
          <Skeleton colorMode={colorScheme} width='100%' />
        </YStack>
      </YStack>
    </AnimatedContainer>
  );
}
