import { ComponentProps, useCallback, useMemo } from 'react';
import { MaterialTabBar, Tabs } from 'react-native-collapsible-tab-view';
import { ColorTokens, useTheme } from 'tamagui';

export type TabContainerProps = ComponentProps<typeof Tabs.Container> & {
  materialTabBarProps?: ComponentProps<typeof MaterialTabBar>;
  backgroundColor?: ColorTokens;
};

function Container({
  children,
  materialTabBarProps,
  containerStyle,
  backgroundColor = '$background',
  ...rest
}: TabContainerProps) {
  const theme = useTheme();

  const resolvedBackgroundColor = theme[backgroundColor]?.val ?? backgroundColor;
  const indicatorColor = theme.primary.val;
  const activeLabelColor = theme.color.val;
  const inactiveLabelColor = theme.color10.val;

  const styles = useMemo(
    () => ({
      container: {
        backgroundColor: resolvedBackgroundColor,
      },
      tabBar: {
        borderWidth: 0,
        backgroundColor: resolvedBackgroundColor,
        height: 48,
        borderBottomWidth: 0,
        paddingHorizontal: 20,
      },
      tabBarContent: {
        justifyContent: 'flex-start' as const,
      },
      tabItem: {
        minWidth: 0,
        paddingHorizontal: 0,
        borderWidth: 0,
        paddingVertical: 0,
        marginRight: 16,
        alignItems: 'center' as const,
        justifyContent: 'flex-end' as const,
        paddingBottom: 8,
        height: 48,
        lineHeight: 48,
      },
      tabLabel: {
        minWidth: 0,
        borderWidth: 0,
        fontWeight: '600' as const,
        textTransform: 'none' as const,
        textAlign: 'left' as const,
        fontSize: 17,
        includeFontPadding: false,
        margin: 0,
      },
      tabIndicator: {
        backgroundColor: indicatorColor,
        height: 2,
        borderRadius: 1,
        marginTop: 0,
        borderWidth: 0,
      },
    }),
    [indicatorColor, resolvedBackgroundColor],
  );

  const renderTabBar = useCallback(
    (props: ComponentProps<typeof MaterialTabBar>) => (
      <MaterialTabBar
        {...props}
        scrollEnabled
        style={styles.tabBar}
        contentContainerStyle={styles.tabBarContent}
        tabStyle={styles.tabItem}
        labelStyle={styles.tabLabel}
        indicatorStyle={styles.tabIndicator}
        activeColor={activeLabelColor}
        inactiveColor={inactiveLabelColor}
        {...materialTabBarProps}
      />
    ),
    [activeLabelColor, inactiveLabelColor, styles, materialTabBarProps],
  );

  const headerContainerStyle = useMemo(
    () => ({
      elevation: 0,
      shadowOpacity: 0,
      shadowRadius: 0,
      shadowOffset: { width: 0, height: 0 },
      borderBottomWidth: 0,
      backgroundColor: resolvedBackgroundColor,
      paddingHorizontal: 0,
    }),
    [resolvedBackgroundColor],
  );

  return (
    <Tabs.Container
      containerStyle={[styles.container, containerStyle]}
      renderTabBar={renderTabBar}
      headerContainerStyle={headerContainerStyle}
      {...rest}
    >
      {children}
    </Tabs.Container>
  );
}

export default {
  Container,
  Tab: Tabs.Tab,
  Lazy: Tabs.Lazy,
  FlatList: Tabs.FlatList,
  ScrollView: Tabs.ScrollView,
  SectionList: Tabs.SectionList,
  FlashList: Tabs.FlashList,
};
