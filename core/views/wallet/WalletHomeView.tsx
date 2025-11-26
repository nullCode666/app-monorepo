import { Link } from 'expo-router';
import { useMemo, type ReactNode } from 'react';
import { Dimensions, TouchableOpacity } from 'react-native';

import { ScrollView, Typography, XStack, YStack } from '@/core/components';
import { ChevronRight } from '@/core/components/icons';
import { ActivityItem, APPROVALS, DEFI_ACTIVITY, NFTS, TOKEN_LIST } from '@/core/constants/wallet';
import { GradientHeader } from '@/core/views/header/GradientHeader';
import { HeaderLeft } from '@/core/views/header/HeaderLeft';
import { HeaderRight } from '@/core/views/header/HeaderRight';
import ApprovalItem from '@/core/views/wallet/containers/ApprovalItem';
import DefiActivityItem from '@/core/views/wallet/containers/DefiActivityItem';
import NFTItem from '@/core/views/wallet/containers/NFTItem';
import TokenItem from '@/core/views/wallet/containers/TokenItem';
import WalletHeaderPrice from '@/core/views/wallet/WalletHomeHeader';

const { width } = Dimensions.get('window');
const NFT_ITEM_WIDTH = (width - 32 - 24) / 3;

export function WalletHomeView() {
  const tokens = useMemo(() => TOKEN_LIST.slice(0, 3), []);
  const nfts = useMemo(() => NFTS.slice(0, 3), []);
  const defiActivities = useMemo(
    () => DEFI_ACTIVITY.filter((item) => item.type === 'item').slice(0, 3) as ActivityItem[],
    [],
  );
  const approvals = useMemo(() => APPROVALS.slice(0, 3), []);

  return (
    <GradientHeader
      title='Wallet'
      gradientColor={null}
      leftItem={<HeaderLeft />}
      rightItem={<HeaderRight mode='history' />}
    >
      <ScrollView contentContainerStyle={{ pb: '$6' }}>
        <WalletHeaderPrice />

        <Section title='Token' href='/list/token'>
          <YStack px='$4'>
            {tokens.map((token, index) => (
              <TokenItem key={token.id} token={token} isFirst={index === 0} isLast={index === tokens.length - 1} />
            ))}
          </YStack>
        </Section>

        <Section title='DeFi' href='/list/defi'>
          <YStack px='$4'>
            {defiActivities.map((item, index) => (
              <DefiActivityItem key={item.id} item={item} isLast={index === defiActivities.length - 1} />
            ))}
          </YStack>
        </Section>

        <Section title='NFT' href='/list/nft'>
          <XStack gap='$3' px='$4' pt='$4'>
            {nfts.map((nft) => (
              <NFTItem key={nft.id} item={nft} width={NFT_ITEM_WIDTH} />
            ))}
          </XStack>
        </Section>

        <Section title='Approval' href='/list/approval'>
          <YStack px='$4'>
            {approvals.map((item, index) => (
              <ApprovalItem key={item.id} item={item} isLast={index === approvals.length - 1} />
            ))}
          </YStack>
        </Section>
      </ScrollView>
    </GradientHeader>
  );
}

type SectionProps = {
  title: string;
  href: string;
  children: ReactNode;
};

function Section({ title, href, children }: SectionProps) {
  return (
    <YStack mb='$8'>
      <Link href={href} asChild>
        <TouchableOpacity activeOpacity={0.7}>
          <XStack alignItems='center' gap='$2' height={28} mb='$2'>
            <Typography.TextPrimary ml='$4' fontSize={24} fontWeight='600' lineHeight={28} letterSpacing={1}>
              {title}
            </Typography.TextPrimary>
            <ChevronRight size={20} color='$color10' />
          </XStack>
        </TouchableOpacity>
      </Link>
      {children}
    </YStack>
  );
}
