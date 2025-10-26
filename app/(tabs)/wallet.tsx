import { Link } from 'expo-router';
import { Button, Text, View, YStack } from "tamagui";

import { APP_BUILD_NUMBER, APP_VERSION } from "../../core/config";

export default () => {
  return (
    <YStack flex={1} bg="$background">
      <View>
        <Text>APP_VERSION: {APP_VERSION}</Text>
        <Text>APP_BUILD_NUMBER: {APP_BUILD_NUMBER}</Text>

        <Link asChild href="/settings">
          <Button>
            open settings
          </Button>
        </Link>
      </View>
    </YStack>
  );
}