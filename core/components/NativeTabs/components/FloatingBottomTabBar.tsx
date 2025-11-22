import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { useState } from 'react';
import { LayoutChangeEvent, StyleSheet, View } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withTiming
} from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme } from 'tamagui';

import { Typography } from '@/core/components';
import { TabItemConfig } from '../types';
import { AnimatedOpacityView } from './AnimatedOpacityView';
import { ShaderLight } from './ShaderLight';

type FloatingBottomTabBarProps = BottomTabBarProps & {
  items: TabItemConfig[];
};

const TAB_BAR_HEIGHT = 64;
const TAB_BAR_WIDTH = 320;
const TAB_BAR_BOTTOM_MARGIN = 0;
const TAB_BAR_HORIZONTAL_PADDING = 10;

export function FloatingBottomTabBar({
  state,
  descriptors,
  navigation,
  items,
}: FloatingBottomTabBarProps) {
  const { bottom } = useSafeAreaInsets();
  const [layout, setLayout] = useState({ width: 0, height: 0 });
  const activeIndex = useSharedValue(state.index);

  const theme = useTheme();
  const backgroundColor = theme.background?.val ?? '#1a1a1a';
  const primaryColor = theme.primary.val;

  useDerivedValue(() => {
    activeIndex.value = withTiming(state.index, { duration: 80 });
  }, [state.index]);

  const handleLayout = (e: LayoutChangeEvent) => {
    setLayout(e.nativeEvent.layout);
  };

  const availableWidth = layout.width - (TAB_BAR_HORIZONTAL_PADDING * 2);
  const tabWidth = availableWidth / state.routes.length;

  const indicatorStyle = useAnimatedStyle(() => {
    if (layout.width === 0) return {};

    return {
      transform: [
        { translateX: TAB_BAR_HORIZONTAL_PADDING + (activeIndex.value * tabWidth) },
      ],
    };
  });

  return (
    <View style={[styles.container, { bottom: bottom + TAB_BAR_BOTTOM_MARGIN }]}>
      <View style={[styles.blurContainer, { backgroundColor }]}>
        {}
        {layout.width > 0 && (
          <Animated.View style={[styles.shaderContainer, { width: tabWidth }, indicatorStyle]}>
            <ShaderLight width={tabWidth} height={layout.height} color={primaryColor} />
          </Animated.View>
        )}

        <View style={[styles.tabsContainer, { paddingHorizontal: TAB_BAR_HORIZONTAL_PADDING }]} onLayout={handleLayout}>
          {state.routes.map((route, index) => {
            const item = items.find((i) => i.name === route.name);
            const isFocused = state.index === index;

            const onPress = () => {
              const event = navigation.emit({
                type: 'tabPress',
                target: route.key,
                canPreventDefault: true,
              });

              if (!isFocused && !event.defaultPrevented) {
                navigation.navigate(route.name, route.params);
              }
            };

            return (
              <AnimatedOpacityView
                key={route.key}
                index={index}
                activeIndex={activeIndex}
                onPress={onPress}
                style={styles.tabItem}
              >
                {item ? (
                  <>
                    <MaterialCommunityIcons
                      name={isFocused ? (item.materialIcon.selected as any) : (item.materialIcon.default as any)}
                      size={24}
                      color={isFocused ? primaryColor : (theme.color?.val ?? 'white')}
                    />
                    {}
                    {}
                  </>
                ) : null}
              </AnimatedOpacityView>
            );
          })}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    alignSelf: 'center',
    width: TAB_BAR_WIDTH,
    height: TAB_BAR_HEIGHT,
    borderRadius: 32,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.4,
    shadowRadius: 20,
    elevation: 10,
  },
  blurContainer: {
    flex: 1,
    backgroundColor: 'rgba(30,30,30,0.9)',
    borderRadius: 32,
    overflow: 'hidden',
  },
  tabsContainer: {
    flexDirection: 'row',
    flex: 1,
  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  shaderContainer: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
  },
});
