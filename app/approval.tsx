import { useNavigation } from 'expo-router';
import { useLayoutEffect } from 'react';

import { FlashList } from '@/core/components';
import { APPROVALS } from '@/core/constants/wallet';
import ApprovalItem, { ApprovalItemData } from '@/core/views/wallet/containers/ApprovalItem';


export default function ApprovalScreen() {
  const navigation = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({
      title: '授权管理',
      headerSearchBarOptions: {
        placeholder: '搜索协议或资产',
      },
    });
  }, [navigation]);

  return (
    <FlashList<ApprovalItemData>
      data={APPROVALS}
      renderItem={({ item }) => <ApprovalItem item={item} />}
      keyExtractor={(item) => item.id}
      showsVerticalScrollIndicator={false}
    />
  );
}
