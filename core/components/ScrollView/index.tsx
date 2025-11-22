import { ScrollView as TamaguiScrollView, type ScrollViewProps as TamaguiScrollViewProps, styled } from 'tamagui';

export type ScrollViewProps = TamaguiScrollViewProps;

const ScrollView = styled(TamaguiScrollView, {
  showsVerticalScrollIndicator: false,
});

export default ScrollView;
