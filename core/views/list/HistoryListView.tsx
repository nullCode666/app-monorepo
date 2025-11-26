import { useCallback } from 'react';
import { StyleSheet } from 'react-native';

import { FlashList, Typography } from '@/core/components';
import { HISTORY_ACTIVITY } from '@/core/constants/wallet';
import type { HistoryActivityItemData } from '@/core/views/wallet/containers/HistoryActivityItem';
import HistoryActivityItem from '@/core/views/wallet/containers/HistoryActivityItem';

const styles = StyleSheet.create({
  contentContainer: { paddingHorizontal: 16 },
});

export function HistoryListView() {
  const renderItem = useCallback(({ item }: { item: (typeof HISTORY_ACTIVITY)[number] }) => {
    if (item.type === 'section') {
      return (
        <Typography.TextSecondary pt='$4' pb='$2' color='$color11' textTransform='uppercase'>
          {item.date}
        </Typography.TextSecondary>
      );
    }

    return <HistoryActivityItem item={item as HistoryActivityItemData} href='/detail/history' />;
  }, []);

  return (
    <FlashList
      contentContainerStyle={styles.contentContainer}
      data={HISTORY_ACTIVITY}
      renderItem={renderItem}
      keyExtractor={(item) => item.id}
      insetHeaderFooter={false}
    />
  );
}
