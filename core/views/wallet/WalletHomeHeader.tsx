import { Link } from 'expo-router';

import { Button, Typography, XStack, YStack } from '@/core/components';
import { ArrowDownToLine, ArrowUpFromLine } from '@/core/components/icons';

const ACTION_ITEMS = [
  { Icon: ArrowUpFromLine, label: 'Send', href: '/send' },
  { Icon: ArrowDownToLine, label: 'Receive', href: '/receive' },
] as const;

export default function WalletHomeHeader() {
  return (
    <YStack alignItems='center' pt='$10' gap='$10' pb='$10'>
      <YStack gap='$2' justifyContent='center' alignItems='center'>
        <Typography.NumberHeading flexWrap='wrap' textAlign='center'>
          $8,888,888.88
        </Typography.NumberHeading>

        <XStack gap='$2' alignItems='center'>
          <Typography.NumberSecondary valueChange={100} fontSize={15} color='$color10' />
          <Typography.NumberSecondary percentageChange={100} wrapInBrackets fontSize={15} />
          <Typography.TextSecondary>· 24h</Typography.TextSecondary>
        </XStack>
      </YStack>

      <XStack justifyContent='space-between' alignItems='center' gap='$4' px='$4' width='100%'>
        {ACTION_ITEMS.map(({ Icon, label, href }) => (
          <Link key={label} href={href} asChild>
            <Button type='default' size='large' fullWidth icon={<Icon size={24} color='$color' />}>
              <Typography.TextPrimary mt={2} color='$color'>
                {label}
              </Typography.TextPrimary>
            </Button>
          </Link>
        ))}
      </XStack>
    </YStack>
  );
}
