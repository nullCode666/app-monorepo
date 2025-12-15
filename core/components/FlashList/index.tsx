import { FlashList as FlashListBase, FlashListProps as FlashListPropsBase, FlashListRef } from '@shopify/flash-list';
import { forwardRef, useMemo } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { isIOS26OrAbove } from '@/core/utils';
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

/**
 * Default insets for FlashList.
 * If the iOS version is 26 or above, the insets will be true.
 * Otherwise, the insets will be false.
 *
 * Because in iOS 26, the header is transparent, so we need to set the insets to true.
 */
const DEFAULT_INSETS = isIOS26OrAbove()
  ? { insetHeaderFooter: true, insetSafearea: true }
  : { insetHeaderFooter: false, insetSafearea: false };

export type FlashListProps<T> = FlashListPropsBase<T> & {
  insetHorizontal?: boolean;
  insetSafearea?: boolean;
  insetHeaderFooter?: boolean;
  estimatedItemSize?: number;
};

function InnerFlashList<T>(
  {
    insetHorizontal = true,
    insetSafearea = DEFAULT_INSETS.insetSafearea,
    insetHeaderFooter = DEFAULT_INSETS.insetHeaderFooter,
    contentContainerStyle,
    showsVerticalScrollIndicator = false,
    ...rest
  }: FlashListProps<T>,
  ref: React.Ref<FlashListRef<T>>,
) {
  const { top, bottom } = useSafeAreaInsets();

  const safeAreaStyle = useMemo<ViewStyle | undefined>(() => {
    if (!insetHorizontal) return undefined;

    const paddingTop = (insetSafearea ? top : 0) + (insetHeaderFooter ? 54 : 0);
    const paddingBottom = (insetSafearea ? bottom : 0) + (insetHeaderFooter ? 72 : 0);

    if (!paddingTop && !paddingBottom) return undefined;

    return {
      paddingTop,
      paddingBottom,
    };
  }, [bottom, insetHeaderFooter, insetHorizontal, insetSafearea, top]);

  const mergedContentStyle = useMemo<ContentStyle>(
    () => mergeContentStyle(contentContainerStyle, safeAreaStyle),
    [contentContainerStyle, safeAreaStyle],
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
  props: FlashListProps<T> & { ref?: React.Ref<FlashListRef<T>> },
) => React.ReactElement | null;

export { FlashListRef };
