import { Icon, Label, NativeTabs } from 'expo-router/unstable-native-tabs';
import { SafeAreaView } from "react-native-safe-area-context";
export default function TabLayout() {
  return (
    <SafeAreaView style={{ flex: 1 }} edges={["top"]}>
      <NativeTabs>
        <NativeTabs.Trigger name="wallet">
          <Label>Wallet</Label>
          <Icon sf="house.fill" drawable="custom_android_drawable" />
        </NativeTabs.Trigger>
        <NativeTabs.Trigger name="swap">
          <Icon sf="arrow.swap" drawable="custom_settings_drawable" />
          <Label>Swap</Label>
        </NativeTabs.Trigger>
        <NativeTabs.Trigger name="developer">
          <Icon sf="computermouse.fill" drawable="custom_settings_drawable" />
          <Label>Developer</Label>
        </NativeTabs.Trigger>
        <NativeTabs.Trigger name="explore" role="search">
          <Label>Explore</Label>
        </NativeTabs.Trigger>
      </NativeTabs>
    </SafeAreaView>
  );
}
