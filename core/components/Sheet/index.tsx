import { Sheet as TamaguiSheet, type SheetProps as TamaguiSheetProps } from '@tamagui/sheet';

import { X as CloseIcon } from '../icons';
import Pressable from '../Pressable';
import * as Typography from '../Typography';
import XStack from '../XStack';
import YStack from '../YStack';

import type { ComponentProps, ReactNode } from 'react';

export type SheetProps = {
  open: boolean;
  onOpenChange: NonNullable<TamaguiSheetProps['onOpenChange']>;
  children: ReactNode;
  snapPoints?: TamaguiSheetProps['snapPoints'];
  dismissOnSnapToBottom?: boolean;
  modal?: boolean;
  title?: ReactNode;
  description?: ReactNode;
  showCloseButton?: boolean;
  showHandle?: boolean;
  wrapContent?: boolean;
  contentProps?: ComponentProps<typeof YStack>;
  scrollViewProps?: ComponentProps<typeof TamaguiSheet.ScrollView> | null;
  sheetProps?: Omit<TamaguiSheetProps, 'open' | 'onOpenChange' | 'children'>;
  overlayProps?: Parameters<typeof TamaguiSheet.Overlay>[0];
  handleProps?: Parameters<typeof TamaguiSheet.Handle>[0];
  frameProps?: Parameters<typeof TamaguiSheet.Frame>[0];
};

export default function Sheet({
  open,
  onOpenChange,
  children,
  snapPoints = [70],
  dismissOnSnapToBottom = true,
  modal = true,
  title,
  description,
  showCloseButton,
  showHandle = true,
  wrapContent = true,
  contentProps,
  scrollViewProps = null,
  sheetProps,
  overlayProps,
  handleProps,
  frameProps,
}: SheetProps) {
  const shouldRenderHeader = Boolean(title || description || showCloseButton);
  const shouldRenderClose = showCloseButton ?? Boolean(title || description);

  const handleClose = () => {
    onOpenChange(false);
  };

  const headerNode = shouldRenderHeader ? (
    <XStack alignItems='center' gap='$3' width='100%'>
      {shouldRenderClose ? (
        <Pressable
          onPress={handleClose}
          hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}
        >
          <XStack
            width={36}
            height={36}
            borderRadius='$9'
            alignItems='center'
            justifyContent='center'
            backgroundColor='$color4'
          >
            <CloseIcon size={18} color='$color11' />
          </XStack>
        </Pressable>
      ) : null}
      <YStack flex={1} minWidth={0} gap={description ? '$1' : undefined}>
        {typeof title === 'string' ? (
          <Typography.TextPrimary fontWeight='600' numberOfLines={1}>
            {title}
          </Typography.TextPrimary>
        ) : title}
        {typeof description === 'string' ? (
          <Typography.TextSecondary>{description}</Typography.TextSecondary>
        ) : description}
      </YStack>
    </XStack>
  ) : null;

  const wrappedChildren = wrapContent ? (
    <YStack gap='$3' width='100%' {...contentProps}>
      {children}
    </YStack>
  ) : (
    children
  );

  return (
    <TamaguiSheet
      open={open}
      onOpenChange={onOpenChange}
      modal={modal}
      snapPoints={snapPoints}
      dismissOnSnapToBottom={dismissOnSnapToBottom}
      zIndex={sheetProps?.zIndex ?? 200000}
      {...sheetProps}
    >
      <TamaguiSheet.Overlay
        enterStyle={{ opacity: 0 }}
        exitStyle={{ opacity: 0 }}
        backgroundColor='$background'
        {...overlayProps}
      />
      {showHandle ? (
        <TamaguiSheet.Handle backgroundColor='$background2' height={4} {...handleProps} />
      ) : null}
      <TamaguiSheet.Frame
        backgroundColor='$backgroundModal'
        borderRadius='$10'
        borderColor='$background2'
        alignSelf='center'
        px='$4'
        py='$4'
        gap='$4'
        borderWidth={2}
        borderBottomWidth={0}
        {...frameProps}
      >
        {headerNode}
        {scrollViewProps ? (
          <TamaguiSheet.ScrollView
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps='handled'
            {...scrollViewProps}
          >
            {wrappedChildren}
          </TamaguiSheet.ScrollView>
        ) : (
          wrappedChildren
        )}
      </TamaguiSheet.Frame>
    </TamaguiSheet>
  );
}
