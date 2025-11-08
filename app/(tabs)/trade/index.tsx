import { ArrowUpDown, ChevronRight, Wallet } from '@tamagui/lucide-icons';
import { BlurView } from 'expo-blur';
import { type ReactNode, useMemo } from 'react';
import { ImageBackground, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme, View } from 'tamagui';

import { Button, Tabs, Typography, XStack, YStack } from '@/core/components';

type TokenMeta = {
  symbol: string;
  name: string;
  accentColor: string;
  badge?: {
    label: string;
    accentColor: string;
  };
};

type CardProps = {
  token: TokenMeta;
  amount: string;
  amountHint: string;
  walletLabel: string;
  walletAmount: string;
  walletActionLabel?: string;
};

type TradeInfoRowProps = {
  label: string;
  children: ReactNode;
  chevron?: boolean;
};

type TradePanelProps = {
  from: CardProps;
  to: CardProps;
  actionButton: {
    label: string;
    disabled?: boolean;
  };
  infoRows: TradeInfoRowProps[];
  notice?: {
    icon?: ReactNode;
    text: string;
    backgroundColor: string;
  };
  colors: {
    muted: string;
    primary: string;
    badgeSuccessBackground: string;
    badgeSuccessColor: string;
  };
};

const TOKEN_MAP: Record<string, TokenMeta> = {
  trx: {
    symbol: 'TRX',
    name: 'Tron',
    accentColor: '#FF3B30',
    badge: { label: 'TRX', accentColor: '#FF3B30' },
  },
  usdt: {
    symbol: 'USDT',
    name: 'Tether USDT',
    accentColor: '#26A17B',
    badge: { label: 'TRX', accentColor: '#FF3B30' },
  },
  eth: {
    symbol: 'ETH',
    name: 'Ether',
    accentColor: '#627EEA',
    badge: { label: 'TRX', accentColor: '#FF3B30' },
  },
};

export default function TradeScreen() {
  const { top, bottom } = useSafeAreaInsets();
  const theme = useTheme();

  const mutedColor = theme.color10.val;
  const primaryColor = theme.primary.val;
  const successColor = theme.green10.val;

  const styles = useMemo(
    () =>
      StyleSheet.create({
        scrollContent: {
          flex: 1,
          paddingBottom: bottom + 32,
          paddingHorizontal: 16,
          paddingTop: 16,
          gap: 20,
        },
        lockedBackground: {
          overflow: 'hidden',
          marginBottom: 16,
          flex: 1,
        },
        lockedOverlay: {
          paddingVertical: 36,
          paddingHorizontal: 24,
          alignItems: 'center',
          justifyContent: 'center',
          flex: 1,
          gap: 8,
        },
      }),
    [bottom],
  );

  const colors = useMemo(
    () => ({
      muted: mutedColor,
      primary: primaryColor,
      badgeSuccessBackground: 'rgba(48, 164, 108, 0.18)',
      badgeSuccessColor: successColor,
    }),
    [mutedColor, primaryColor, successColor],
  );

  return (
    <Tabs.Container
      containerStyle={{ top: top + 38 }}
    >
      <Tabs.Tab name='swap' label='Swap'>
        <Tabs.ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps='handled'
        >
          <TradePanel
            from={{
              token: TOKEN_MAP.trx,
              amount: '1',
              amountHint: '≈¥2.10178',
              walletLabel: 'Wallet 2...WrbW',
              walletAmount: '37.16185',
              walletActionLabel: '全部',
            }}
            to={{
              token: TOKEN_MAP.usdt,
              amount: '0.295618',
              amountHint: '≈¥2.10184',
              walletLabel: 'Wallet 2...WrbW',
              walletAmount: '2.5861',
            }}
            actionButton={{ label: '兑换' }}
            infoRows={[
              {
                label: '路径',
                children: (
                  <XStack alignItems='center' gap='$2'>
                    <View
                      width={24}
                      height={24}
                      borderRadius={12}
                      background='linear-gradient(135deg, #43C6AC, #191654)'
                    />
                    <Typography.Text fontWeight='600'>LiquidMesh</Typography.Text>

                  </XStack>
                ),
                chevron: true,
              },
              {
                label: '兑换率',
                children: <Typography.NumberSecondary>{'1 TRX ≈ 0.29561 USDT'}</Typography.NumberSecondary>,
                chevron: true,
              },
              {
                label: '滑点',
                children: <Typography.Text>自动 | 1%</Typography.Text>,
                chevron: true,
              },
              {
                label: '最低收款金额',
                children: <Typography.NumberSecondary color='$color'>{'0.29266 USDT'}</Typography.NumberSecondary>,
              },
              {
                label: '交易手续费',
                children: <Typography.NumberSecondary color='$color'>{'0.0002 USDT'}</Typography.NumberSecondary>,
              },
            ]}
            colors={colors}
          />
        </Tabs.ScrollView>
      </Tabs.Tab>
      <Tabs.Tab name='pro' label='Pro'>
        <Tabs.ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps='handled'
        >
          <ImageBackground
            source={require('@/core/assets/images/trade-locked.jpg')}
            style={styles.lockedBackground}
          >
            <BlurView intensity={15} tint='dark' style={styles.lockedOverlay}>
              <Typography.TextHeading>即将解锁 敬请期待</Typography.TextHeading>
            </BlurView>
          </ImageBackground>
        </Tabs.ScrollView>
      </Tabs.Tab>
    </Tabs.Container>
  );
}

function TradePanel({ from, to, actionButton, infoRows, notice, colors }: TradePanelProps) {
  return (
    <YStack gap='$1'>
      <Section label='从' mutedColor={colors.muted}>
        <TradeTokenCard
          card={from}
          colors={colors}
        />
      </Section>

      <View
        width={0}
        height={0}
        borderRadius={22}
        alignSelf='center'
        alignItems='center'
        justifyContent='center'
        bg='$background'
      >
        <ArrowUpDown size={24} marginTop={-24} color='$primary' />
      </View>

      <Section label='到' mutedColor={colors.muted}>
        <TradeTokenCard
          card={to}
          colors={colors}
        />
      </Section>

      {notice ? (
        <XStack
          gap='$2'
          alignItems='center'
          borderRadius={16}
          px='$3'
          py='$3'
        // backgroundColor={notice.backgroundColor}
        >
          {notice.icon}
          <Typography.Text color='#FF3B30' flex={1} fontSize={13} lineHeight={18}>
            {notice.text}
          </Typography.Text>
        </XStack>
      ) : null}

      <Button
        height={56}
        backgroundColor='$primary'
        borderRadius={16}
        pressStyle={{ opacity: 0.85 }}
        disabled={actionButton.disabled}
        opacity={actionButton.disabled ? 0.6 : 1}
      >
        <Typography.Text fontSize={17} fontWeight='600' color='#000'>
          {actionButton.label}
        </Typography.Text>
      </Button>

      <YStack gap='$1' borderRadius={16} px='$1'>
        {infoRows.map((row, index) => (
          <TradeInfoRow key={`${row.label}-${index}`} label={row.label} chevron={row.chevron} mutedColor={colors.muted}>
            {row.children}
          </TradeInfoRow>
        ))}
      </YStack>
    </YStack>
  );
}

function Section({ label, mutedColor, children }: { label: string; mutedColor: string; children: ReactNode }) {
  return (
    <YStack gap='$2'>
      <Typography.Text fontSize={13} color={mutedColor as any}>
        {label}
      </Typography.Text>
      {children}
    </YStack>
  );
}

function TradeTokenCard({ card, colors }: { card: CardProps; colors: TradePanelProps['colors'] }) {
  return (
    <YStack
      bg='$backgroundPress'
      borderRadius={20}
      px='$4'
      py='$4'
      gap='$3'
      shadowColor='rgba(15, 23, 42, 0.16)'
      shadowOpacity={0.1}
      shadowRadius={12}
      shadowOffset={{ width: 0, height: 6 }}
      elevation={3}
    >
      <XStack justifyContent='space-between' alignItems='center' gap='$3'>
        <TokenAvatar meta={card.token} />
        <YStack flex={1} gap='$1'>
          <Typography.Text fontSize={17} fontWeight='700'>
            {card.token.symbol}
          </Typography.Text>
          <Typography.Text fontSize={13} color={colors.muted as any}>
            {card.token.name}
          </Typography.Text>
        </YStack>
        <YStack alignItems='flex-end' gap='$1'>
          <Typography.Number fontWeight='600'>{card.amount}</Typography.Number>
          <Typography.NumberSecondary>{card.amountHint}</Typography.NumberSecondary>
        </YStack>
      </XStack>

      <XStack justifyContent='space-between' alignItems='center'>
        <XStack gap='$2' alignItems='center'>
          <Wallet size={18} color='$color' />
          <Typography.Text fontSize={13} color={colors.muted as any}>
            {card.walletLabel}
          </Typography.Text>
        </XStack>
        <XStack gap='$2' alignItems='center'>
          <Typography.NumberSecondary color='$color'>
            {card.walletAmount}
          </Typography.NumberSecondary>
          {card.walletActionLabel ? (
            <Typography.Text fontSize={13} fontWeight='600' color={colors.primary as any}>
              {card.walletActionLabel}
            </Typography.Text>
          ) : null}
        </XStack>
      </XStack>
    </YStack>
  );
}

function TokenAvatar({ meta }: { meta: TokenMeta }) {
  return (
    <View width={52} height={52} borderRadius={16} backgroundColor={meta.accentColor as any} alignItems='center' justifyContent='center'>
      <Typography.Text fontSize={20} fontWeight='700' color='#fff'>
        {meta.symbol}
      </Typography.Text>
      {meta.badge ? (
        <View
          position='absolute'
          bottom={-4}
          right={-4}
          borderRadius={12}
          borderWidth={2}
          borderColor='#fff'
          backgroundColor={meta.badge.accentColor as any}
          px={6}
          py={2}
        >
          <Typography.Text fontSize={10} fontWeight='600' color='#fff'>
            {meta.badge.label}
          </Typography.Text>
        </View>
      ) : null}
    </View>
  );
}

function TradeInfoRow({ label, children, chevron = false, mutedColor }: TradeInfoRowProps & { mutedColor: string }) {
  return (
    <XStack
      justifyContent='space-between'
      alignItems='center'
      py='$1'
      px='$2'
    >
      <Typography.TextSecondary>
        {label}
      </Typography.TextSecondary>
      <XStack alignItems='center' gap='$2'>
        {children}
        {chevron ? <ChevronRight size={16} color={mutedColor as any} /> : null}
      </XStack>
    </XStack>
  );
}
