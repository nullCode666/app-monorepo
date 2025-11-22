import { Stack } from 'expo-router';
import { ApprovalListView } from '@/core/views/list/ApprovalListView';

export default function ApprovalListScreen() {
  return (
    <>
      <Stack.Screen options={{ title: 'Approvals' }} />
      <ApprovalListView />
    </>
  );
}
