import { useCallback } from 'react';

import { FlashList, Typography } from '@/core/components';
import { TOKEN_DETAIL_ACTIVITY } from '@/core/constants/wallet';
import HistoryActivityItem from '@/core/views/wallet/containers/HistoryActivityItem';
import TokenDetailHeader from '@/core/views/wallet/containers/TokenDetailHeader';

type TokenDetailActivity = (typeof TOKEN_DETAIL_ACTIVITY)[number];

type Props = {
  symbol?: string;
};

export function SingleTokenDetail({ symbol }: Props) {
  const renderHistoryItem = useCallback(({ item, index }: { item: TokenDetailActivity; index: number }) => {
    if (item.type === 'section') {
      return (
        <Typography.TextSecondary px='$4' py='$4' pb='$2' color='$color11' textTransform='uppercase'>
          {item.date}
        </Typography.TextSecondary>
      );
    }

    const isLast = index === TOKEN_DETAIL_ACTIVITY.length - 1;
    return <HistoryActivityItem px='$4' item={item} isLast={isLast} />;
  }, []);

  return (
    <FlashList<TokenDetailActivity>
      data={TOKEN_DETAIL_ACTIVITY}
      renderItem={renderHistoryItem}
      keyExtractor={(item) => item.id}
      ListHeaderComponent={() => <TokenDetailHeader symbol={symbol} />}
    />
  );
}
