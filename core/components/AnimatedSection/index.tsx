import { AnimatePresence, MotiView } from 'moti';
import { Children, isValidElement, useMemo } from 'react';

import { ChevronRight } from '../icons';
import Pressable from '../Pressable';
import * as Typography from '../Typography';
import View from '../View';
import XStack from '../XStack';
import YStack from '../YStack';

import type { MotiProps } from 'moti';
import type { ComponentProps, ReactElement, ReactNode } from 'react';

const SECTION_BORDER_RADIUS = 20;
const ROW_HEIGHT = 48;
const DIVIDER_HEIGHT = 1;

const BASE_DIVIDER_PROPS = {
  height: DIVIDER_HEIGHT,
  bg: '$color6',
  opacity: 0.6,
  marginHorizontal: '$4',
} as const;

const getDividerHeight = (dividerProps?: ComponentProps<typeof View>) => {
  const value = dividerProps?.height;
  return typeof value === 'number' ? value : DIVIDER_HEIGHT;
};

const createDivider = (key: string, dividerProps?: ComponentProps<typeof View>) => (
  <View key={key} {...BASE_DIVIDER_PROPS} {...dividerProps} />
);

type ChildArray = ReturnType<typeof Children.toArray>;
type AnimatedSectionItemElement = ReactElement<AnimatedSectionItemProps>;

const isRenderableChild = (child: ReactNode) => child !== null && child !== undefined && child !== false;

const isItemElement = (child: ReactNode): child is AnimatedSectionItemElement =>
  isValidElement(child) && child.type === Item;

const shouldShowDividerAfter = (child: AnimatedSectionItemElement) => child.props.showDividerAfter !== false;
const shouldShowDividerBefore = (child: AnimatedSectionItemElement) => child.props.showDividerBefore !== false;

const interleaveDividers = (
  children: ChildArray,
  dividerProps: ComponentProps<typeof View> | undefined,
  keyPrefix: string,
) => {
  const validChildren = children.filter(isRenderableChild);
  if (validChildren.length <= 1) {
    return validChildren;
  }

  return validChildren.flatMap((child, index) => {
    const nodes: ReactNode[] = [child];
    const next = validChildren[index + 1];

    if (
      next !== undefined &&
      isItemElement(child) &&
      isItemElement(next) &&
      shouldShowDividerAfter(child) &&
      shouldShowDividerBefore(next)
    ) {
      nodes.push(createDivider(`${keyPrefix}-divider-${index}`, dividerProps));
    }

    return nodes;
  });
};

export type AnimatedSectionContainerProps = {
  children: ReactNode;
  description?: ReactNode;
  animate?: boolean;
  containerProps?: ComponentProps<typeof YStack>;
  cardProps?: ComponentProps<typeof YStack>;
  descriptionProps?: ComponentProps<typeof Typography.TextSecondary>;
  showDividers?: boolean;
  dividerProps?: ComponentProps<typeof View>;
};

function Container({
  children,
  description,
  animate = false,
  containerProps,
  cardProps,
  descriptionProps,
  showDividers = true,
  dividerProps,
}: AnimatedSectionContainerProps) {
  const childArray = useMemo(() => Children.toArray(children), [children]);

  const contentChildren = useMemo(
    () =>
      showDividers
        ? interleaveDividers(childArray, dividerProps, 'animated-section-container')
        : childArray.filter(isRenderableChild),
    [childArray, dividerProps, showDividers],
  );

  const content = (
    <YStack gap='$2' width='100%' {...containerProps}>
      <YStack borderRadius={SECTION_BORDER_RADIUS} backgroundColor='$background2' overflow='hidden' {...cardProps}>
        {contentChildren}
      </YStack>
      {description ? (
        typeof description === 'string' ? (
          <Typography.TextSecondary fontSize={12} {...descriptionProps}>
            {description}
          </Typography.TextSecondary>
        ) : (
          description
        )
      ) : null}
    </YStack>
  );

  if (!animate) {
    return content;
  }

  return (
    <MotiView transition={{ type: 'timing', duration: 220 }} style={{ width: '100%' }}>
      {content}
    </MotiView>
  );
}

export type AnimatedSectionItemProps = ComponentProps<typeof XStack> & {
  leading?: ReactNode;
  title?: ReactNode;
  trailing?: ReactNode;
  onPress?: () => void;
  disabled?: boolean;
  pressableProps?: ComponentProps<typeof Pressable>;
  showDividerBefore?: boolean;
  showDividerAfter?: boolean;
};

function Item({
  leading,
  title,
  trailing,
  onPress,
  disabled,
  pressableProps,
  height = ROW_HEIGHT,
  gap = '$3',
  showDividerBefore,
  showDividerAfter,
  ...stackProps
}: AnimatedSectionItemProps) {
  const trailingNode = trailing ?? <ChevronRight size={18} color='$color10' />;

  const titleNode =
    typeof title === 'string' ? (
      <Typography.Text fontSize={15} numberOfLines={1}>
        {title}
      </Typography.Text>
    ) : (
      title
    );

  const mainContent = (
    <XStack
      height={height}
      px='$4'
      alignItems='center'
      justifyContent='space-between'
      backgroundColor='transparent'
      gap={gap}
      {...stackProps}
    >
      <XStack flex={1} alignItems='center' gap='$3'>
        {leading ? <View flexShrink={0}>{leading}</View> : null}
        <YStack flex={1} minWidth={0}>
          {titleNode}
        </YStack>
      </XStack>
      {trailingNode}
    </XStack>
  );

  if (!onPress && !pressableProps) {
    return mainContent;
  }

  return (
    <Pressable onPress={onPress} disabled={disabled} {...pressableProps}>
      {() => mainContent}
    </Pressable>
  );
}

export type AnimatedSectionCollapsibleProps = {
  open: boolean;
  children: ReactNode;
  height?: number;
  containerProps?: ComponentProps<typeof View>;
  spacerProps?: ComponentProps<typeof MotiView>;
  contentProps?: ComponentProps<typeof MotiView>;
  showDividers?: boolean;
  dividerProps?: ComponentProps<typeof View>;
  includeTopDivider?: boolean;
};

function Collapsible({
  open,
  children,
  height,
  containerProps,
  spacerProps,
  contentProps,
  showDividers = true,
  dividerProps,
  includeTopDivider = true,
}: AnimatedSectionCollapsibleProps) {
  const childArray = useMemo(() => Children.toArray(children).filter(isRenderableChild), [children]);

  const contentChildren = useMemo(
    () => (showDividers ? interleaveDividers(childArray, dividerProps, 'animated-section-collapsible') : childArray),
    [childArray, dividerProps, showDividers],
  );

  const computedHeight = useMemo(() => {
    if (typeof height === 'number') {
      return height;
    }

    if (childArray.length > 0 && childArray.every(isItemElement)) {
      const dividerHeight = getDividerHeight(dividerProps);
      const internalDividerTotal = showDividers ? dividerHeight * Math.max(childArray.length - 1, 0) : 0;
      const topDividerTotal = includeTopDivider ? dividerHeight : 0;
      return childArray.length * ROW_HEIGHT + internalDividerTotal + topDividerTotal;
    }

    return ROW_HEIGHT;
  }, [childArray, dividerProps, height, includeTopDivider, showDividers]);

  const baseTransition = useMemo<MotiProps['transition']>(() => ({ type: 'timing', duration: 220 }), []);

  const resolvedDividerHeight = getDividerHeight(dividerProps);

  return (
    <View position='relative' {...containerProps}>
      <MotiView
        from={{ height: 0 }}
        animate={{ height: open ? computedHeight : 0 }}
        transition={baseTransition}
        style={{ width: '100%' }}
        {...spacerProps}
      />
      <AnimatePresence>
        {open ? (
          <MotiView
            key='animated-section-collapsible-content'
            from={{ opacity: 0, translateX: 24 }}
            animate={{ opacity: 1, translateX: 0 }}
            exit={{ opacity: 0, translateX: 24 }}
            transition={baseTransition}
            style={{ position: 'absolute', left: 0, right: 0, top: 0 }}
            pointerEvents={open ? 'auto' : 'none'}
            {...contentProps}
          >
            {includeTopDivider
              ? createDivider('animated-section-collapsible-top-divider', {
                ...dividerProps,
                height: resolvedDividerHeight,
              })
              : null}
            {contentChildren}
          </MotiView>
        ) : null}
      </AnimatePresence>
    </View>
  );
}

const AnimatedSection = {
  Container,
  Item,
  Collapsible,
  ROW_HEIGHT,
  DIVIDER_HEIGHT,
};

export default AnimatedSection;
