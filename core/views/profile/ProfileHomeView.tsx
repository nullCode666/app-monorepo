import { Link } from 'expo-router';

import { Button, Typography, XStack, YStack, useTheme } from '@/core/components';
import { Settings } from '@/core/components/icons';

export function ProfileHomeView() {
  const t = useTheme();
  const backgroundColor = t.background.val;

  return (
    <YStack flex={1} backgroundColor='$background' pt='$12'>
      <XStack justifyContent='flex-end' px='$4' mb='$4'>
        <Link href='/settings' asChild>
          <Button type='text' icon={<Settings size={24} color='$color' />} />
        </Link>
      </XStack>

      <YStack px='$4' mb='$6'>
        <Link href='/developer-info' asChild>
           <Button type='default' fullWidth>
             <Typography.Text>Developer Info</Typography.Text>
           </Button>
        </Link>
      </YStack>
    </YStack>
  );
}

