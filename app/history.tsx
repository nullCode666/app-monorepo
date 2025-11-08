import { useNavigation } from 'expo-router';
import { useCallback, useEffect } from 'react';

import { FlashList, Typography } from '@/core/components';
import { HISTORY_ACTIVITY, type HistoryRow } from '@/core/constants/wallet';
import type { HistoryActivityItemData } from '@/core/views/wallet/containers/HistoryActivityItem';
import HistoryActivityItem from '@/core/views/wallet/containers/HistoryActivityItem';

const ACTIVITY = HISTORY_ACTIVITY;

export default function HistoryScreen() {
  const navigation = useNavigation();

  const renderItem = useCallback(({ item }: { item: HistoryRow }) => {
    if (item.type === 'section') {
      return (
        <Typography.TextSecondary
          p='$4'
          pb='$2'
          color='$color11'
          textTransform='uppercase'
        >
          {item.date}
        </Typography.TextSecondary>
      );
    }

    return <HistoryActivityItem item={item as HistoryActivityItemData} />;
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
    <FlashList<HistoryRow>
      data={ACTIVITY}
      renderItem={renderItem}
      keyExtractor={item => item.id}
    />
  );
}
