import { Typography, XStack, YStack } from '@/core/components';
import {
  ArrowDownToLine,
  ArrowUpFromLine,
  Check,
  Github,
  History,
  ShieldCheck,
} from '@/core/components/icons';
import { DemoPage, DemoSection } from '@/core/views/developer/DemoComponents';

const ICON_SETS = [
  {
    label: 'Core Icons',
    icons: [
      { label: 'Send', element: <ArrowUpFromLine size={32} /> },
      { label: 'Receive', element: <ArrowDownToLine size={32} /> },
      { label: 'History', element: <History size={32} /> },
      { label: 'Shield', element: <ShieldCheck size={32} /> },
    ],
  },
  {
    label: 'Brand & Custom',
    icons: [
      { label: 'GitHub', element: <Github size={32} /> },
      { label: 'Check', element: <Check size={32} /> },
    ],
  },
];

export default function IconScreen() {
  return (
    <DemoPage>
      {ICON_SETS.map(({ label, icons }) => (
        <DemoSection key={label} title={label}>
          <XStack gap='$4' flexWrap='wrap'>
            {icons.map(({ label: iconLabel, element }) => (
              <YStack key={iconLabel} gap='$2' alignItems='center' width={80}>
                {element}
                <Typography.TextSecondary fontSize={12} textAlign='center'>
                  {iconLabel}
                </Typography.TextSecondary>
              </YStack>
            ))}
          </XStack>
        </DemoSection>
      ))}
    </DemoPage>
  );
}
