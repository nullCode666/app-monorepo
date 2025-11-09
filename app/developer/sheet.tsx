import { useMemo, useState } from 'react';

import { Button, Pressable, Sheet, Typography, XStack, YStack } from '@/core/components';
import { Check } from '@/core/components/icons';
import { DemoPage, DemoSection } from '@/core/views/developer/DemoComponents';

type LanguageOption = {
  value: string;
  label: string;
  description?: string;
};

const LANGUAGES: readonly LanguageOption[] = [
  { value: 'auto', label: 'Auto', description: 'Follow system setting' },
  { value: 'en', label: 'English' },
  { value: 'zh-Hans', label: '简体中文' },
  { value: 'zh-Hant-HK', label: '繁體中文（香港）' },
  { value: 'zh-Hant-TW', label: '繁體中文（臺灣）' },
  { value: 'ja', label: '日本語' },
  { value: 'ko', label: '한국어' },
  { value: 'de', label: 'Deutsch' },
  { value: 'es', label: 'Español' },
  { value: 'fr', label: 'Français' },
  { value: 'hi', label: 'हिन्दी' },
  { value: 'id', label: 'Bahasa Indonesia' },
] as const;

export default function SheetDemoScreen() {
  const [open, setOpen] = useState(false);
  const [language, setLanguage] = useState<LanguageOption['value']>('en');

  const selectedLabel = useMemo(() => (
    LANGUAGES.find(item => item.value === language)?.label ?? 'Auto'
  ), [language]);

  const handleSelect = (value: (typeof LANGUAGES)[number]['value']) => {
    setLanguage(value);
    setOpen(false);
  };

  return (
    <DemoPage>
      <DemoSection
        title='基础弹层'
        description='`Sheet` 封装了遮罩、圆角容器、标题栏和关闭按钮，适合作为底部弹出的偏好设置或表单容器。'
      >
        <YStack gap='$4'>
          <YStack gap='$2'>
            <Typography.TextSecondary>当前语言</Typography.TextSecondary>
            <Typography.TextPrimary fontWeight='600'>{selectedLabel}</Typography.TextPrimary>
          </YStack>

          <Button onPress={() => setOpen(true)} size='$5'>
            打开语言选择
          </Button>
        </YStack>

        <Sheet
          open={open}
          onOpenChange={setOpen}
          title='Language'
          description='Select the language used across the app.'
          snapPoints={[70]}
          contentProps={{ gap: '$2' }}
        >
          {LANGUAGES.map(item => {
            const isSelected = item.value === language;

            return (
              <Pressable key={item.value} onPress={() => handleSelect(item.value)}>
                <XStack
                  alignItems='center'
                  justifyContent='space-between'
                  gap='$3'
                  px='$3'
                  py='$3'
                  borderRadius='$6'
                  backgroundColor={isSelected ? '$color3' : 'transparent'}
                >
                  <YStack flex={1} gap={item.description ? '$1' : undefined}>
                    <Typography.Text>{item.label}</Typography.Text>
                    {item.description ? (
                      <Typography.TextSecondary>{item.description}</Typography.TextSecondary>
                    ) : null}
                  </YStack>
                  {isSelected ? <Check size={18} color='$primary' /> : null}
                </XStack>
              </Pressable>
            );
          })}
        </Sheet>
      </DemoSection>
    </DemoPage>
  );
}
