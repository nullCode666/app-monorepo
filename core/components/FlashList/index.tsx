import { FlashList as FlashListBase, FlashListProps as FlashListPropsBase, FlashListRef } from '@shopify/flash-list';
import { forwardRef, useMemo } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import type { StyleProp, ViewStyle } from 'react-native';

type ContentStyle = StyleProp<ViewStyle>;

function mergeContentStyle(original: ContentStyle, extra?: ViewStyle): ContentStyle {
  if (!extra) return original;
  if (!original) return extra;
  if (Array.isArray(original)) {
    return [...original, extra];
  }
  return [original, extra];
}

export type FlashListProps<T> = FlashListPropsBase<T> & {
  insetHorizontal?: boolean;
  insetSafearea?: boolean;
  insetHeaderFooter?: boolean;
};

function InnerFlashList<T>(
  {
    insetHorizontal = true,
    insetSafearea = true,
    insetHeaderFooter = true,
    contentContainerStyle,
    showsVerticalScrollIndicator = false,
    ...rest
  }: FlashListProps<T>,
  ref: React.Ref<FlashListRef<T>>,
) {
  const { top, bottom } = useSafeAreaInsets();

  const safeAreaStyle = useMemo<ViewStyle | undefined>(
    () => {
      if (!insetHorizontal) return undefined;

      const paddingTop = (insetSafearea ? top : 0) + (insetHeaderFooter ? 54 : 0);
      const paddingBottom = (insetSafearea ? bottom : 0) + (insetHeaderFooter ? 72 : 0);

      if (!paddingTop && !paddingBottom) return undefined;

      return {
        paddingTop,
        paddingBottom,
      };
    },
    [bottom, insetHeaderFooter, insetHorizontal, insetSafearea, top]
  );

  const mergedContentStyle = useMemo<ContentStyle>(
    () => mergeContentStyle(contentContainerStyle, safeAreaStyle),
    [contentContainerStyle, safeAreaStyle]
  );

  return (
    <FlashListBase<T>
      ref={ref}
      {...rest}
      contentContainerStyle={mergedContentStyle}
      showsVerticalScrollIndicator={showsVerticalScrollIndicator}
    />
  );
}

export const FlashList = forwardRef(InnerFlashList) as <T>(
  props: FlashListProps<T> & { ref?: React.Ref<FlashListRef<T>> }
) => React.ReactElement | null;

export { FlashListRef };
