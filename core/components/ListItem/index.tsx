import { type ComponentProps, memo, type ReactNode } from 'react';
import { styled, XStack, YStack } from 'tamagui';

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

const ListItemContainer = styled(XStack, {
  alignItems: 'center',
  justifyContent: 'space-between',
  gap: '$3',
  py: '$2',
});

const LeadingContainer = styled(XStack, {
  alignItems: 'center',
  justifyContent: 'center',
  flexShrink: 0,
});

const BodyContainer = styled(YStack, {
  flex: 1,
  minWidth: 0,
  height: '100%',
});

const RowContainer = styled(XStack, {
  flex: 1,
  alignItems: 'center',
  justifyContent: 'space-between',
  gap: '$2',
});

const LeftColumn = styled(YStack, {
  minWidth: 0,
  flexShrink: 1,
  justifyContent: 'center',
});

const RightColumn = styled(XStack, {
  alignItems: 'center',
  justifyContent: 'flex-end',
  minWidth: 0,
  flexShrink: 1,
  gap: '$2',
});

const TrailingContainer = styled(XStack, {
  alignItems: 'center',
  justifyContent: 'center',
  flexShrink: 0,
});

const AccessoryContainer = styled(XStack, {
  alignItems: 'center',
  justifyContent: 'center',
  flexShrink: 0,
});

function ListItemComponent({
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
    <LeadingContainer>
      {leading}
    </LeadingContainer>
  ) : null;

  const hasTopRow = bodyLeftTop || bodyRightTop;
  const hasBottomRow = bodyLeftBottom || bodyRightBottom;

  const bodyNode = (hasTopRow || hasBottomRow) ? (
    <BodyContainer>
      {hasTopRow ? (
        <RowContainer>
          <LeftColumn>
            {bodyLeftTop}
          </LeftColumn>
          <RightColumn>
            {bodyRightTop}
          </RightColumn>
        </RowContainer>
      ) : null}

      {hasBottomRow ? (
        <RowContainer>
          <LeftColumn>
            {bodyLeftBottom}
          </LeftColumn>
          <RightColumn>
            {bodyRightBottom}
          </RightColumn>
        </RowContainer>
      ) : null}
    </BodyContainer>
  ) : null;

  const trailingNode = trailing ? (
    <TrailingContainer>
      {trailing}
    </TrailingContainer>
  ) : null;

  const accessoryNode = rightAccessory ? (
    <AccessoryContainer>
      {rightAccessory}
    </AccessoryContainer>
  ) : null;

  return (
    <ListItemContainer {...rest}>
      {leadingNode}
      {bodyNode}
      {trailingNode}
      {accessoryNode}
    </ListItemContainer>
  );
}

export default memo(ListItemComponent);
