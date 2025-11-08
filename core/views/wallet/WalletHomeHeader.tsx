import { BlurView } from 'expo-blur';

import { Avatar, Typography, View, XStack, YStack } from '@/core/components';
import { ArrowDownToLine, ArrowUpFromLine, History, ShieldCheck } from '@/core/components/icons';
import LineGraph from '@/core/components/LineGraph';
import { POINTS } from '@/core/constants/wallet';

const ACTION_ITEMS = [
  { Icon: ArrowUpFromLine, label: 'Send', href: '/send/wallet' },
  { Icon: ArrowDownToLine, label: 'Receive', href: '/receive' },
  { Icon: History, label: 'History', href: '/history' },
  { Icon: ShieldCheck, label: 'Approval', href: '/approval' },
] as const;

export default function WalletHomeHeader() {
  return (
    <YStack
      bg='$background'
      pb='$6'
      borderBottomWidth={1}
      borderColor='$background2'
    >
      <XStack flex={1}>
        <YStack
          gap='$2'
          flex={1}
          px='$4'
          justifyContent='center'
          alignItems='flex-start'
          position='relative'
          overflow='hidden'
          height={168}
        >
          <View
            pointerEvents='none'
            position='absolute'
            top={0}
            bottom={0}
            left={0}
            right={0}
          >
            <LineGraph points={POINTS} />
          </View>
          <BlurView
            pointerEvents='none'
            tint='default'
            intensity={20}
            style={{
              position: 'absolute',
              top: 0,
              bottom: 0,
              left: 0,
              right: 0,
              borderRadius: 160,
            }}
          />
          <Typography.NumberHeading flexWrap='wrap'>
            $8,888,888.88
          </Typography.NumberHeading>
          <XStack gap='$1' alignItems='center'>
            <Typography.NumberSecondary valueChange={100} />
            <Typography.NumberSecondary percentageChange={100} wrapInBrackets />
            <Typography.TextSecondary>· 24h</Typography.TextSecondary>
          </XStack>
        </YStack>
      </XStack>
      <XStack px='$4' justifyContent='space-between' alignItems='center'>
        {ACTION_ITEMS.map(({ Icon, label, href }) => (
          <Avatar.Token label={label} media={Icon} key={label} link={href} />
        ))}
      </XStack>
    </YStack>
  );
};
