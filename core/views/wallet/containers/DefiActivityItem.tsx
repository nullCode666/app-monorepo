import { Link } from 'expo-router';
import { useMemo } from 'react';
import { StyleSheet } from 'react-native';
import { useTheme } from 'tamagui';

import { Avatar, Pressable, Typography, XStack, YStack } from '@/core/components';

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

const parseChangeValue = (raw: string) => {
  if (!raw) return null;
  const match = raw.trim().match(/^([+-]?\d[\d,]*(?:\.\d+)?)(.*)$/);
  if (!match) return null;
  const numeric = Number(match[1].replace(/,/g, ''));
  if (Number.isNaN(numeric)) return null;
  const suffix = match[2]?.trim();
  return { numeric, suffix } as const;
};

function DefiActivityItem({ item, href = '/defi-detail' }: DefiActivityItemProps) {
  const theme = useTheme();

  const secondaryTextColor = theme.color11.val;
  const cardBackground = theme.backgroundStrong.val;

  const styles = useMemo(
    () =>
      StyleSheet.create({
        row: {
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingHorizontal: 16,
          paddingVertical: 14,
          backgroundColor: cardBackground,
          gap: 12,
        },
        textContainer: {
          flex: 1,
          gap: 4,
        },
        title: {
          fontSize: 15,
          fontWeight: '600',
        },
        subtitle: {
          fontSize: 13,
          color: secondaryTextColor,
        },
        rightContainer: {
          alignItems: 'flex-end',
          gap: 4,
        },
        rightTop: {
          fontSize: 14,
          fontWeight: '600',
        },
        rightBottom: {
          fontSize: 13,
          color: secondaryTextColor,
        },
      }),
    [cardBackground, secondaryTextColor],
  );

  const renderValue = (value: string, textStyle: any) => {
    const parsed = parseChangeValue(value);
    if (parsed) {
      return (
        <XStack alignItems='center' gap='$1'>
          <Typography.NumberSecondary valueChange={parsed.numeric} style={textStyle} />
          {parsed.suffix ? (
            <Typography.Text style={textStyle}>{parsed.suffix}</Typography.Text>
          ) : null}
        </XStack>
      );
    }

    return <Typography.Text style={textStyle}>{value}</Typography.Text>;
  };

  const primaryBadge = item.badges[0];
  const secondaryBadge = item.badges[1];

  return (
    <Link href={href} asChild>
      <Pressable>
        {() => (
          <XStack style={styles.row}>
            <Avatar.Token
              media={primaryBadge ? (
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
              ) : undefined}
              cornerMedia={secondaryBadge ? (
                <Typography.TextPrimary fontSize={10} fontWeight='700'>
                  {secondaryBadge.label.slice(0, 2).toUpperCase()}
                </Typography.TextPrimary>
              ) : undefined}
              labelColor='$color11'
            />
            <YStack style={styles.textContainer}>
              <Typography.Text style={styles.title}>{item.title}</Typography.Text>
              <Typography.Text style={styles.subtitle}>{item.subtitle}</Typography.Text>
            </YStack>
            <YStack style={styles.rightContainer}>
              {renderValue(item.rightTop, styles.rightTop)}
              {renderValue(item.rightBottom, styles.rightBottom)}
            </YStack>
          </XStack>
        )}
      </Pressable>
    </Link>
  );
}

export default DefiActivityItem;

