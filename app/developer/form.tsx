import { Check, ChevronDown } from '@tamagui/lucide-icons';
import { Select } from '@tamagui/select';
import { useCallback, useMemo, useState } from 'react';

import { Form, Sheet, Typography, XStack, YStack } from '@/core/components';
import { Adapt } from '@/core/components/Adapt';
import { DemoPage, DemoSection } from '@/core/views/developer/DemoComponents';

const NETWORK_OPTIONS = [
  { label: '以太坊主网', value: 'ethereum' },
  { label: 'Arbitrum One', value: 'arbitrum' },
  { label: 'Polygon PoS', value: 'polygon' },
  { label: 'Base', value: 'base' },
] as const;

type NetworkValue = (typeof NETWORK_OPTIONS)[number]['value'];

export default function FormScreen() {
  const [biometrics, setBiometrics] = useState(true);
  const [notifications, setNotifications] = useState(false);

  // 受控：显式管理 open，关闭时彻底不渲染 Content
  const [open, setOpen] = useState(false);
  const [network, setNetwork] = useState<NetworkValue>('ethereum');

  const selectedNetworkLabel = useMemo(
    () => NETWORK_OPTIONS.find((o) => o.value === network)?.label ?? '未选择',
    [network]
  );

  const handleNetworkChange = useCallback((value: string) => {
    setNetwork(value as NetworkValue);
    setOpen(false);
  }, []);

  return (
    <DemoPage>
      <DemoSection
        title='Switch'
        description='通过 `Form.Switch` 封装原生开关组件，自动应用主题色轨道。'
      >
        <YStack gap='$3'>
          <XStack justifyContent='space-between' alignItems='center'>
            <Typography.Text>启用面容识别</Typography.Text>
            <Form.Switch value={biometrics} onValueChange={setBiometrics} />
          </XStack>
          <XStack justifyContent='space-between' alignItems='center'>
            <Typography.Text>营销通知</Typography.Text>
            <Form.Switch value={notifications} onValueChange={setNotifications} />
          </XStack>
        </YStack>
      </DemoSection>

      <DemoSection
        title='Select'
        description='受控模式 + 小屏使用 Sheet，自适配；关闭时完全不挂载内容，杜绝常驻。'
      >
        <YStack gap='$3'>
          <XStack justifyContent='space-between' alignItems='center'>
            <Typography.Text>当前网络</Typography.Text>
            <Typography.Text fontWeight='700'>{selectedNetworkLabel}</Typography.Text>
          </XStack>

          <Select
            value={network}
            onValueChange={handleNetworkChange}
            open={open}
            onOpenChange={setOpen}
          >
            <Select.Trigger
              size='$4'
              width='100%'
              iconAfter={ChevronDown}
              aria-label='选择网络'
            >
              <Select.Value placeholder='选择网络…' />
            </Select.Trigger>

            {/* 小屏触摸端用 Sheet 呈现 */}
            <Adapt when='maxMd' platform='touch'>
              <Sheet open={open} onOpenChange={setOpen} snapPoints={[60]} wrapContent={false} scrollViewProps={{ contentContainerStyle: { paddingBottom: 0 } }}>
                <Adapt.Contents />
              </Sheet>
            </Adapt>

            <Select.Content>
              <Select.Viewport minWidth={220} borderRadius='$4' borderWidth={1} borderColor='$color6'>
                <Select.Group>
                  <Select.Label>以太坊生态</Select.Label>
                  {NETWORK_OPTIONS.map((opt, i) => (
                    <Select.Item key={opt.value} value={opt.value} index={i} bg='transparent'>
                      <Select.ItemText>{opt.label}</Select.ItemText>
                      <Select.ItemIndicator marginLeft='auto'>
                        <Check size={16} />
                      </Select.ItemIndicator>
                    </Select.Item>
                  ))}
                </Select.Group>
              </Select.Viewport>
              <Select.ScrollDownButton />
            </Select.Content>
          </Select>
        </YStack >
      </DemoSection >
    </DemoPage >
  );
}