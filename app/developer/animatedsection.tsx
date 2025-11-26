import { useState } from 'react';

import { AnimatedSection, Avatar, Form, Typography } from '@/core/components';
import { DemoPage, DemoSection } from '@/core/views/developer/DemoComponents';

const MOCK_ITEMS = [
  { id: 'wallet', label: '管理账户' },
  { id: 'contacts', label: '管理联系人' },
  { id: 'security', label: '安全与防护' },
] as const;

export default function AnimatedSectionDemoScreen() {
  const [advancedMode, setAdvancedMode] = useState(false);

  return (
    <DemoPage>
      <DemoSection title='开关控制内容' description='与设置页一致，切换开关时平滑展开或收起附加说明。'>
        <AnimatedSection.Container animate description='开关状态与额外信息保持在同一容器内。'>
          <AnimatedSection.Item
            leading={<Avatar.Token size='small' media='🛠️' />}
            title='启用高级模式'
            trailing={<Form.Switch name='advancedMode' value={advancedMode} onValueChange={setAdvancedMode} />}
          />
          <AnimatedSection.Collapsible open={advancedMode}>
            <AnimatedSection.Item
              leading={<Avatar.Token size='small' media='ℹ️' />}
              title='高级模式说明'
              trailing={<Typography.TextSecondary color='$color10'>了解更多</Typography.TextSecondary>}
              onPress={() => setAdvancedMode(false)}
            />
          </AnimatedSection.Collapsible>
        </AnimatedSection.Container>
      </DemoSection>

      <DemoSection
        title='静态容器'
        description='`AnimatedSection.Container` 包裹一组设置项，并提供统一的圆角卡片、分隔与描述。'
      >
        <AnimatedSection.Container description='常用操作入口'>
          {MOCK_ITEMS.map((item) => (
            <AnimatedSection.Item
              key={item.id}
              leading={<Avatar.Token size='small' media={item.label.slice(0, 1)} />}
              title={item.label}
            />
          ))}
        </AnimatedSection.Container>
      </DemoSection>
    </DemoPage>
  );
}
