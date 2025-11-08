import { type ComponentProps, type ReactNode } from 'react';
import { XStack, YStack } from 'tamagui';

type XStackProps = ComponentProps<typeof XStack>;

export type ListItemProps = Omit<XStackProps, 'children'> & {
  leading?: ReactNode;
  bodyLeftTop?: ReactNode;
  bodyLeftBottom?: ReactNode;
  bodyRightTop?: ReactNode;
  bodyRightBottom?: ReactNode;
  trailing?: ReactNode;
  rightAccessory?: ReactNode;
};

function ListItem({
  leading,
  bodyLeftTop,
  bodyLeftBottom,
  bodyRightTop,
  bodyRightBottom,
  trailing,
  rightAccessory,
  ...rest
}: ListItemProps) {
  const leadingNode = leading ? (
    <XStack
      alignItems='center'
      justifyContent='center'
      flexShrink={0}
    >
      {leading}
    </XStack>
  ) : null;

  const hasTopRow = bodyLeftTop || bodyRightTop;
  const hasBottomRow = bodyLeftBottom || bodyRightBottom;

  const bodyNode = (hasTopRow || hasBottomRow) ? (
    <YStack flex={1} minWidth={0} height='100%'>
      {hasTopRow ? (
        <XStack flex={1} alignItems='center' justifyContent='space-between' gap='$2'>
          <YStack width='50%' minWidth={0}>
            {bodyLeftTop}
          </YStack>
          <XStack
            alignItems='center'
            justifyContent='flex-end'
            minWidth={0}
            width='50%'
            gap='$2'
          >
            {bodyRightTop}
          </XStack>
        </XStack>
      ) : null}

      {hasBottomRow ? (
        <XStack flex={1} alignItems='center' justifyContent='space-between' gap='$2'>
          <YStack width='50%'>
            {bodyLeftBottom}
          </YStack>
          <XStack
            alignItems='center'
            justifyContent='flex-end'
            minWidth={0}
            gap='$2'
            width='50%'
          >
            {bodyRightBottom}
          </XStack>
        </XStack>
      ) : null}
    </YStack>
  ) : null;

  const trailingNode = trailing ? (
    <XStack
      alignItems='center'
      justifyContent='center'
      flexShrink={0}
    >
      {trailing}
    </XStack>
  ) : null;

  const accessoryNode = rightAccessory ? (
    <XStack alignItems='center' justifyContent='center' flexShrink={0}>
      {rightAccessory}
    </XStack>
  ) : null;

  return (
    <XStack
      alignItems='center'
      justifyContent='space-between'
      gap='$3'
      px='$4'
      py='$2'
      {...rest}
    >
      {leadingNode}
      {bodyNode}
      {trailingNode}
      {accessoryNode}
    </XStack>
  );
}

export default ListItem;
