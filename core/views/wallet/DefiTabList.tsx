import { useCallback } from 'react';

import { Tabs, Typography } from '@/core/components';
import { ActivityRow, DEFI_ACTIVITY } from '@/core/constants/wallet';

import DefiActivityItem from './containers/DefiActivityItem';
import DefiTabHeader from './containers/DefiTabHeader';

export default function DefiTabList() {

  const renderItem = useCallback(({ item }: { item: ActivityRow }) => {
    if (item.type === 'section') {
      return <Typography.TextSecondary p='$4' pb='$0' color='$color11' textTransform='uppercase'>{item.date}</Typography.TextSecondary>;
    }

    return <DefiActivityItem item={item} />;
  }, []);

  return (
    <Tabs.FlatList
      ListHeaderComponent={DefiTabHeader}
      data={DEFI_ACTIVITY}
      renderItem={renderItem}
      keyExtractor={(item: ActivityRow) => item.id}
    />
  );
}
