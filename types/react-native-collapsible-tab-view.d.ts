declare module 'react-native-collapsible-tab-view' {
  import * as React from 'react';
  import { ComponentType } from 'react';

  export type TabName = string;
  export type TabProps<T extends TabName = TabName> = {
    readonly name: T;
    label?: React.ReactNode;
    children: React.ReactNode;
  };

  export type TabBarProps = Record<string, any>;
  export type MaterialTabBarProps = Record<string, any>;
  export type MaterialTabItemProps = Record<string, any>;
  export type CollapsibleProps = Record<string, any>;
  export type CollapsibleRef = any;
  export type ContainerRef = any;
  export type OnTabChangeCallback = (data: any) => void;
  export type HeaderMeasurements = any;

  export interface TabsType {
    Container: ComponentType<any>;
    Tab: ComponentType<TabProps>;
    Lazy: ComponentType<any>;
    FlatList: ComponentType<any>;
    ScrollView: ComponentType<any>;
    SectionList: ComponentType<any>;
    FlashList: ComponentType<any>;
    MasonryFlashList: ComponentType<any>;
  }

  export const Tabs: TabsType;
  export const MaterialTabBar: ComponentType<MaterialTabBarProps>;
  export const MaterialTabItem: ComponentType<MaterialTabItemProps>;
  export const Container: ComponentType<any>;
  export const Tab: ComponentType<TabProps>;
  export const Lazy: ComponentType<any>;
  export const FlatList: ComponentType<any>;
  export const ScrollView: ComponentType<any>;
  export const SectionList: ComponentType<any>;
  export const FlashList: ComponentType<any>;
  export const MasonryFlashList: ComponentType<any>;

  export function useCurrentTabScrollY(): any;
  export function useHeaderMeasurements(): HeaderMeasurements;
  export function useFocusedTab(): any;
  export function useAnimatedTabIndex(): any;
  export function useCollapsibleStyle(): any;
}

