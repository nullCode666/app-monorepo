import { useMemo, useState } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme } from 'tamagui';

import { Button, ListItem, ScrollView, Typography, View, XStack, YStack } from '@/core/components';
import Switch from '@/core/components/Form/Switch';
import { ArrowDownToLine, ArrowUpFromLine, Fuel, Gift, UserCircle, Zap } from '@/core/components/icons';
import { GradientHeader } from '@/core/views/header/GradientHeader';

export function UniversalAccountView() {
  const insets = useSafeAreaInsets();
  const [autoPay, setAutoPay] = useState(true);
  const [airDrop, setAirDrop] = useState(false);

  // Get the primary color value from tokens
  const theme = useTheme();
  const primaryColor = theme.primary.val;

  const activities = useMemo(
    () => [
      {
        id: 1,
        type: 'deduct',
        title: 'Gas Deduct',
        network: 'Polygon',
        amount: '-$0.05',
        date: 'Today, 10:23 AM',
      },
      {
        id: 2,
        type: 'deposit',
        title: 'Top Up',
        network: 'Ethereum',
        amount: '+$20.00',
        date: 'Yesterday',
      },
      {
        id: 3,
        type: 'deduct',
        title: 'Gas Deduct',
        network: 'Base',
        amount: '-$0.12',
        date: 'Oct 24',
      },
      {
        id: 4,
        type: 'deduct',
        title: 'Gas Deduct',
        network: 'Arbitrum',
        amount: '-$0.08',
        date: 'Oct 23',
      },
    ],
    [],
  );

  return (
    <GradientHeader
      title='Universal Account'
      gradientColor={primaryColor}
      rightItem={
        <XStack width={36} height={36} justifyContent='center' alignItems='center' borderRadius={18} bg='transparent'>
          <UserCircle size={24} color='$color' />
        </XStack>
      }
    >
      <ScrollView
        flex={1}
        backgroundColor='transparent'
        contentContainerStyle={{ p: '$4', pb: insets.bottom + 20 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Header Card */}
        <YStack
          backgroundColor='$background2'
          borderRadius={24}
          borderWidth={1}
          borderColor='$borderColor'
          p='$4'
          gap='$4'
          mb='$6'
        >
          <XStack justifyContent='space-between' alignItems='flex-start'>
            <YStack gap='$2'>
              <Typography.TextSecondary>Balance</Typography.TextSecondary>
              <Typography.NumberHeading color='$primary' fontSize={46} fontWeight='700'>
                $48.50
              </Typography.NumberHeading>
              <Typography.TextSecondary fontSize={13}>≈ 500+ Transactions Gas</Typography.TextSecondary>
            </YStack>
            <YStack>
              <Typography.TextSecondary fontSize={13}>user@gmail.com</Typography.TextSecondary>
            </YStack>
          </XStack>

          <XStack gap='$3'>
            <Button flex={1} type='primary' size='middle' icon={<ArrowDownToLine size={18} color='#000' />}>
              <Typography.TextPrimary fontWeight='600' color='#000'>
                Deposit
              </Typography.TextPrimary>
            </Button>
            <Button flex={1} size='middle' backgroundColor='$background3' icon={<ArrowUpFromLine size={18} />}>
              <Typography.TextPrimary fontWeight='600'>Withdraw</Typography.TextPrimary>
            </Button>
          </XStack>
        </YStack>

        {/* Control Row */}
        <XStack justifyContent='space-between' alignItems='center' borderRadius={20} mb='$4'>
          <XStack gap='$3' alignItems='center'>
            <View
              width={36}
              height={36}
              borderRadius={18}
              backgroundColor='rgba(255, 159, 10, 0.15)'
              alignItems='center'
              justifyContent='center'
            >
              <Zap size={18} color='#FF9F0A' />
            </View>
            <Typography.Text fontSize={16} fontWeight='600'>
              Auto-pay Gas
            </Typography.Text>
          </XStack>
          <Switch value={autoPay} onValueChange={setAutoPay} />
        </XStack>
        <XStack justifyContent='space-between' alignItems='center' borderRadius={20} mb='$6'>
          <XStack gap='$3' alignItems='center'>
            <View
              width={36}
              height={36}
              borderRadius={18}
              backgroundColor='rgba(48, 209, 88, 0.15)'
              alignItems='center'
              justifyContent='center'
            >
              <Gift size={18} color='$green10' />
            </View>
            <Typography.Text fontSize={16} fontWeight='600'>
              Receive Airdrop
            </Typography.Text>
          </XStack>
          <Switch value={airDrop} onValueChange={setAirDrop} />
        </XStack>

        {/* Activity List */}
        <YStack gap='$4'>
          <Typography.Text fontSize={18} fontWeight='700' color='#8E8E93'>
            Recent Activity
          </Typography.Text>

          <YStack>
            {activities.map((item, index) => {
              const isDeposit = item.type === 'deposit';
              const isLast = index === activities.length - 1;

              return (
                <ListItem
                  key={item.id}
                  separator={!isLast}
                  leading={
                    <View
                      width={56}
                      height={56}
                      borderRadius={20}
                      backgroundColor='rgba(255, 255, 255, 0.05)'
                      alignItems='center'
                      justifyContent='center'
                    >
                      {isDeposit ? <Zap size={20} color='$green10' /> : <Fuel size={20} color='$primary' />}
                    </View>
                  }
                  bodyLeftTop={
                    <Typography.Text fontSize={16} fontWeight='500'>
                      {item.title}
                    </Typography.Text>
                  }
                  bodyLeftBottom={
                    <Typography.TextSecondary fontSize={13}>
                      {isDeposit ? item.date : `via ${item.network}`}
                    </Typography.TextSecondary>
                  }
                  trailing={
                    <Typography.Number fontSize={16} color={isDeposit ? '#30d158' : 'white'} fontWeight='500'>
                      {item.amount}
                    </Typography.Number>
                  }
                />
              );
            })}
          </YStack>
        </YStack>
      </ScrollView>
    </GradientHeader>
  );
}
