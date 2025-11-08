import { ComponentType, useMemo } from 'react';

import { FlashList, FlashListProps, Typography, XStack, YStack } from '@/core/components';
import { DemoPage, DemoSection } from '@/core/views/developer/DemoComponents';

type FlashListItem = {
  id: string;
  title: string;
  subtitle: string;
  change: number;
};

const DATA: FlashListItem[] = Array.from({ length: 20 }).map((_, index) => ({
  id: `token-${index}`,
  title: `Token ${index + 1}`,
  subtitle: `${(Math.random() * 1000).toFixed(2)} USD`,
  change: Math.random() * 6 - 3,
}));

export default function FlashListScreen() {
  const listData = useMemo(() => DATA, []);
  const FlashListComponent = FlashList as unknown as ComponentType<FlashListProps<FlashListItem>>;

  return (
    <DemoPage>
      <DemoSection
        title='FlashList'
        description='High performance list wrapper. Supply `estimatedItemSize` for optimal virtualization.'
      >
        <YStack gap='$3'>
          <Typography.TextSecondary>
            Scroll inside the area below to see virtualization in action.
          </Typography.TextSecondary>
          <YStack height={260} borderRadius='$4' overflow='hidden' borderWidth={1} borderColor='$color5'>
            <FlashListComponent
              data={listData}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <XStack padding='$3' justifyContent='space-between' alignItems='center'>
                  <Typography.Text>{item.title}</Typography.Text>
                  <Typography.NumberSecondary valueChange={item.change} />
                </XStack>
              )}
            />
          </YStack>
        </YStack>
      </DemoSection>
    </DemoPage>
  );
}
