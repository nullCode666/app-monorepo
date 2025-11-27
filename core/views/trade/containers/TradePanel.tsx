import { type ReactNode } from 'react';

import { Button, Typography, View, XStack, YStack } from '@/core/components';
import AnimatedSection from '@/core/components/AnimatedSection';
import { ArrowUpDown, ChevronRight } from '@/core/components/icons';

import { type CardProps, TradeTokenCard } from './TradeTokenCard';

type TradeInfoRowProps = {
  label: string;
  children: ReactNode;
  chevron?: boolean;
};

export type TradePanelProps = {
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
};

export function TradePanel({ from, to, actionButton, infoRows, notice }: TradePanelProps) {
  return (
    <YStack gap='$6'>
      <YStack>
        <TradeTokenCard card={from} label='You Pay' />
        <View zIndex={1} alignSelf='center' marginTop={-16} marginBottom={-16}>
          <View bg='$background' p={4} borderRadius={30}>
            <View
              width={40}
              height={40}
              borderRadius={20}
              alignItems='center'
              justifyContent='center'
              bg='$backgroundModal'
              borderWidth={1}
              borderColor='$color4'
            >
              <ArrowUpDown size={20} color='$primary' />
            </View>
          </View>
        </View>

        <TradeTokenCard card={to} label='You Receive' />
      </YStack>

      {notice ? (
        <XStack gap='$2' alignItems='center' borderRadius={16} px='$4' py='$3' bg='$red2'>
          {notice.icon}
          <Typography.Text color='$red10' flex={1} fontSize={13} lineHeight={18}>
            {notice.text}
          </Typography.Text>
        </XStack>
      ) : null}

      <YStack gap='$6'>
        <AnimatedSection.Container>
          {infoRows.map((row, index) => (
            <AnimatedSection.Item
              key={`${row.label}-${index}`}
              title={row.label}
              trailing={
                <XStack alignItems='center' gap='$1'>
                  {row.children}
                  {row.chevron ? <ChevronRight size={16} color='$color10' /> : null}
                </XStack>
              }
            />
          ))}
        </AnimatedSection.Container>

        <Button type='primary' size='large' height={56} borderRadius={100} disabled={actionButton.disabled} mb='$12'>
          <Typography.Text fontSize={18} fontWeight='600' color='#000'>
            兑换
          </Typography.Text>
        </Button>
      </YStack>
    </YStack>
  );
}
