import { Avatar, ListItem, Typography, YStack, useTheme } from '@/core/components';

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
  isLast?: boolean;
};

function ApprovalItem({ item, isLast }: ApprovalItemProps) {
  const theme = useTheme();

  const mutedColor = theme.color10.val;

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
        separator={!isLast}
      />
    </YStack>
  );
}

export default ApprovalItem;

