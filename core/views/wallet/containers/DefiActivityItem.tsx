import { Link } from 'expo-router';

import { Avatar, ListItem, Pressable, Typography, YStack } from '@/core/components';

export type ActivityBadge = {
  label: string;
  color: string;
};

export type DefiActivityItemData = {
  id: string;
  title: string;
  subtitle: string;
  rightTop: string;
  rightBottom: string;
  badges: ActivityBadge[];
};

type DefiActivityItemProps = {
  item: DefiActivityItemData;
  href?: string;
};

function DefiActivityItem({ item, href = '/detail/defi' }: DefiActivityItemProps) {
  const primaryBadge = item.badges[0];
  const secondaryBadge = item.badges[1];

  return (
    <Link href={href} asChild>
      <Pressable>
        {() => (
          <ListItem
            leading={
              <Avatar.Token
                media={
                  primaryBadge ? (
                    <YStack
                      width='100%'
                      height='100%'
                      borderRadius='$10'
                      alignItems='center'
                      justifyContent='center'
                      backgroundColor='$backgroundPress'
                    >
                      <Typography.TextPrimary fontSize={12} fontWeight='700'>
                        {primaryBadge.label.slice(0, 3).toUpperCase()}
                      </Typography.TextPrimary>
                    </YStack>
                  ) : undefined
                }
                cornerMedia={
                  secondaryBadge ? (
                    <YStack
                      width='100%'
                      height='100%'
                      borderRadius='$10'
                      alignItems='center'
                      justifyContent='center'
                      backgroundColor='$backgroundPress'
                    >
                      <Typography.TextPrimary fontSize={10} fontWeight='700'>
                        {secondaryBadge.label.slice(0, 3).toUpperCase()}
                      </Typography.TextPrimary>
                    </YStack>
                  ) : undefined
                }
              />
            }
            bodyLeftTop={<Typography.TextPrimary>{item.title}</Typography.TextPrimary>}
            bodyLeftBottom={
              <Typography.TextSecondary fontSize={13} color='$color11'>
                {item.subtitle}
              </Typography.TextSecondary>
            }
            bodyRightTop={<Typography.TextSecondary>{item.rightTop}</Typography.TextSecondary>}
            bodyRightBottom={
              <Typography.TextSecondary>{item.rightBottom}</Typography.TextSecondary>
            }
            borderRadius='$6'
            py='$3'
          />
        )}
      </Pressable>
    </Link>
  );
}

export default DefiActivityItem;
