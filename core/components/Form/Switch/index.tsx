import { Switch } from 'react-native';

import { useTheme } from '../../useTheme';

export type RVSwitchProps = {
  value: boolean;
  onValueChange: (value: boolean) => void;
}

export default function RVSwitch({ value, onValueChange }: RVSwitchProps) {
  const theme = useTheme();
  const primaryColor = theme.primary.val;

  return (
    <Switch style={{ alignSelf: 'center' }} value={value} onValueChange={onValueChange} trackColor={{ true: primaryColor }} />
  );
}