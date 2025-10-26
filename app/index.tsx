import { Redirect } from "expo-router";

export default function Index() {
  // /(tabs)/wallet
  return <Redirect href="/wallet" />;
}