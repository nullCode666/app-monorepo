import { Text, View } from "react-native";

import { APP_BUILD_NUMBER, APP_VERSION } from "./config";

export default function Index() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>Edit app/index.tsx to edit this screen.</Text>
      <Text>APP_VERSION: {APP_VERSION}</Text>
      <Text>APP_BUILD_NUMBER: {APP_BUILD_NUMBER}</Text>
    </View>
  );
}
