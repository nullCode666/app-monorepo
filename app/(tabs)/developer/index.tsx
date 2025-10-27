import { FlashList } from '@shopify/flash-list';
import { LinearGradient } from '@tamagui/linear-gradient';
import { ChevronRight } from '@tamagui/lucide-icons';
import { Link } from 'expo-router';
import { MotiView } from 'moti';
import { Card, Separator, XStack, useTheme } from 'tamagui';

import { Pressable, Text, YStack } from '@/core/components';
import { COMPONENT_LIST } from '@/core/constants/developer';

export default function DevList() {
  const t = useTheme();
  const backgroundColor = t.background.get();

  return (
    <FlashList
      style={{ backgroundColor }}
      data={COMPONENT_LIST}
      contentContainerStyle={{ paddingTop: 12, paddingBottom: 24 }}
      keyboardShouldPersistTaps='handled'
      ItemSeparatorComponent={() => <Separator marginVertical='$2' opacity={0} />}
      numColumns={2}
      renderItem={({ item, index }) => (
        <MotiView
          from={{ opacity: 0, translateY: 6 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{ type: 'timing', duration: 220, delay: index * 24 }}
        >
          <Link asChild href={`/developer/${item.name.toLowerCase()}`}>
            <Pressable>
              <Card
                elevate
                bordered
                padding='$2'
                marginHorizontal='$2'
                backgroundColor='$background'
                height={120}
                overflow='hidden'
                justifyContent='space-between'
              >
                <LinearGradient
                  start={[0.5, 1]}
                  end={[1, 0.5]}
                  colors={[item.colors[0], item.colors[1]]}
                  position='absolute'
                  top={0}
                  right={0}
                  bottom={0}
                  left={0}
                />
                <XStack alignItems='center' justifyContent='space-between'>
                  <Text fontSize={24} fontWeight={600}>{item.name}</Text>
                  <ChevronRight />
                </XStack>
                <XStack justifyContent='space-between' gap='$3'>
                  <YStack flex={1} gap='$1'>
                    <Text fontSize={48}>{item.emoji}</Text>
                  </YStack>
                </XStack>
              </Card>
            </Pressable>
          </Link>
        </MotiView>
      )}
    />
  );
}
