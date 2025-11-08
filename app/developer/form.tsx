import { useState } from 'react';

import { Typography, XStack, YStack } from '@/core/components';
import RVSwitch from '@/core/components/Form/Switch';
import { DemoPage, DemoSection } from '@/core/views/developer/DemoComponents';

export default function FormScreen() {
  const [biometrics, setBiometrics] = useState(true);
  const [notifications, setNotifications] = useState(false);

  return (
    <DemoPage>
      <DemoSection
        title='Switch'
        description='A thin wrapper around the native switch applying our primary color to the active track.'
      >
        <YStack gap='$3'>
          <XStack justifyContent='space-between' alignItems='center'>
            <Typography.Text>Enable Biometrics</Typography.Text>
            <RVSwitch value={biometrics} onValueChange={setBiometrics} />
          </XStack>
          <XStack justifyContent='space-between' alignItems='center'>
            <Typography.Text>Marketing Notifications</Typography.Text>
            <RVSwitch value={notifications} onValueChange={setNotifications} />
          </XStack>
        </YStack>
      </DemoSection>
    </DemoPage>
  );
}
