import { useMemo } from 'react';
import { StyleSheet } from 'react-native';
import { useTheme } from 'tamagui';

import { Avatar, ListItem, Typography, YStack } from '@/core/components';

export type ApprovalToken = {
  symbol: string;
  color: string;
  badge?: string;
};

export type ApprovalItemData = {
  id: string;
  token: ApprovalToken;
  amount: string;
  asset: string;
  wallet: string;
  protocol: string;
  spender: string;
  riskMessage?: string;
  actionLabel?: string;
};

type ApprovalItemProps = {
  item: ApprovalItemData;
};

function ApprovalItem({ item }: ApprovalItemProps) {
  const theme = useTheme();

  const mutedColor = theme.color10.val;
  const warningSurface = 'rgba(255, 214, 10, 0.16)';
  const warningAccent = '#FFD60A';
  const cardBackground = theme.backgroundStrong.val;

  const styles = useMemo(
    () =>
      StyleSheet.create({
        card: {
          borderRadius: 20,
          backgroundColor: cardBackground,
          paddingHorizontal: 16,
          paddingVertical: 20,
          gap: 14,
        },
        riskRow: {
          borderRadius: 16,
          backgroundColor: warningSurface,
          paddingHorizontal: 14,
          paddingVertical: 12,
          flexDirection: 'row',
          alignItems: 'center',
        },
        revokeButton: {
          backgroundColor: warningAccent,
          borderRadius: 14,
          paddingHorizontal: 12,
          height: 28,
          justifyContent: 'center',
        },
      }),
    [cardBackground],
  );

  const leading = (
    <Avatar.Token
      media={(
        <Typography.Text fontSize={14} fontWeight='700'>
          {item.token.symbol.slice(0, 3).toUpperCase()}
        </Typography.Text>
      )}
      backgroundColor='$background2'
    />
  );

  return (
    <YStack>
      <ListItem
        leading={leading}
        bodyLeftTop={(
          <Typography.Text fontSize={16} fontWeight='700'>
            {item.amount} {item.asset}
          </Typography.Text>
        )}
        bodyLeftBottom={(
          <Typography.Text fontSize={13} color={mutedColor as any} numberOfLines={1}>
            {item.wallet}
          </Typography.Text>
        )}
        bodyRightTop={(
          <Typography.Text fontSize={14} fontWeight='600'>
            {item.protocol}
          </Typography.Text>
        )}
        bodyRightBottom={(
          <Typography.Text fontSize={13} color={mutedColor as any} numberOfLines={1}>
            {item.spender}
          </Typography.Text>
        )}
      />
    </YStack>
  );
}

export default ApprovalItem;

