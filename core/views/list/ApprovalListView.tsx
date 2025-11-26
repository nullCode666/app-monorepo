import { StyleSheet } from 'react-native';

import { FlashList } from '@/core/components';
import { APPROVALS } from '@/core/constants/wallet';
import ApprovalItem, { ApprovalItemData } from '@/core/views/wallet/containers/ApprovalItem';

const styles = StyleSheet.create({
  contentContainer: { paddingHorizontal: 16, paddingBottom: 24 },
});

export function ApprovalListView() {
  return (
    <FlashList<ApprovalItemData>
      data={APPROVALS}
      renderItem={({ item }) => <ApprovalItem item={item} />}
      keyExtractor={(item) => item.id}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.contentContainer}
    />
  );
}
