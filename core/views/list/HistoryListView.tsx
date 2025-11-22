import { useNavigation } from 'expo-router';
import { useCallback, useEffect } from 'react';

import { FlashList, Typography } from '@/core/components';
import { HISTORY_ACTIVITY } from '@/core/constants/wallet';
import type { HistoryActivityItemData } from '@/core/views/wallet/containers/HistoryActivityItem';
import HistoryActivityItem from '@/core/views/wallet/containers/HistoryActivityItem';

export function HistoryListView() {
  const navigation = useNavigation();

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

  useEffect(() => {
    navigation.setOptions({
      title: '历史记录',
      headerSearchBarOptions: {
        placeholder: '搜索链上活动或协议',
      },
    });
  }, [navigation]);

  return (
    <FlashList
      contentContainerStyle={{ paddingHorizontal: 16 }}
      data={HISTORY_ACTIVITY}
      renderItem={renderItem}
      keyExtractor={(item) => item.id}
      insetHeaderFooter={false}
    />
  );
}
