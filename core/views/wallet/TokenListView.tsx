import { useNavigation } from 'expo-router';
import { useLayoutEffect } from 'react';

import { FlashList, Typography, XStack } from '@/core/components';
import { TOKEN_LIST } from '@/core/constants/wallet';
import TokenDetailHeader from '@/core/views/wallet/containers/TokenDetailHeader';
import TokenItem, { type TokenItemData } from '@/core/views/wallet/containers/TokenItem';

export function TokenListView() {
  const navigation = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerSearchBarOptions: {
        placeholder: '搜索 Token',
      },
    });
  }, [navigation]);

  const PrimaryNode = (
    <Typography.NumberHeading flexWrap='wrap' textAlign='center'>
      $12,345.66
    </Typography.NumberHeading>
  );

  const SecondaryNode = (
    <XStack gap='$2' alignItems='center'>
      <Typography.NumberSecondary valueChange={-1220} fontSize={15} color='$color10' />
      <Typography.NumberSecondary percentageChange={-12.34} wrapInBrackets fontSize={15} />
      <Typography.TextSecondary>· 24h</Typography.TextSecondary>
    </XStack>
  );

  return (
    <FlashList<TokenItemData>
      data={TOKEN_LIST}
      renderItem={({ item, index }) => (
        <TokenItem px='$4' py='$2' token={item} isLast={index === TOKEN_LIST.length - 1} />
      )}
      keyExtractor={(item) => item.id}
      ListHeaderComponent={() => <TokenDetailHeader primaryNode={PrimaryNode} secondaryNode={SecondaryNode} />}
    />
  );
}
