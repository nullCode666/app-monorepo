import * as Clipboard from 'expo-clipboard';
import React from 'react';
import { Controller, type ControllerProps, type FieldValues } from 'react-hook-form';
import { Button, XStack, YStack } from 'tamagui';

import { ClipboardPaste, ScanLine } from '../icons';
import * as Typography from '../Typography';
import { Input as RawInput, type InputProps } from './Input';
import { Select as RawSelect, type SelectProps } from './Select';
import RawSwitch, { type RVSwitchProps } from './Switch';
import { TextArea as RawTextArea, type TextAreaProps } from './TextArea';

export type { InputProps } from './Input';
export type {
  SelectContentProps,
  SelectItemExtraProps,
  SelectItemProps,
  SelectProps,
  SelectScrollButtonProps,
  SelectTriggerProps,
  SelectValueProps,
  SelectViewportProps
} from './Select';
export type { RVSwitchProps } from './Switch';
export type { TextAreaProps } from './TextArea';

export { Controller, FormProvider, useForm, useFormContext, type SubmitHandler } from 'react-hook-form';

type FormAction = { type: 'paste' } | { type: 'scan'; onPress: () => void };

type FormComponentProps<T extends FieldValues, P> = Omit<ControllerProps<T>, 'render'> &
  P & {
    label?: string;
    actions?: FormAction[];
  };

const ActionButton = ({ icon: Icon, onPress }: { icon: any; onPress: () => void }) => (
  <Button size='$2' circular chromeless onPress={onPress} icon={<Icon size={20} color='$color10' />} />
);

const renderActions = (actions: FormAction[] | undefined, onChange: (value: string) => void) => {
  if (!actions?.length) return null;

  return (
    <XStack gap='$4'>
      {actions.map((action, index) => {
        if (action.type === 'paste') {
          return (
            <ActionButton
              key={`paste-${index}`}
              icon={ClipboardPaste}
              onPress={async () => {
                const text = await Clipboard.getStringAsync();
                onChange(text);
              }}
            />
          );
        }
        if (action.type === 'scan') {
          return <ActionButton key={`scan-${index}`} icon={ScanLine} onPress={action.onPress} />;
        }
        return null;
      })}
    </XStack>
  );
};

export function Input<T extends FieldValues>({
  name,
  control,
  rules,
  defaultValue,
  shouldUnregister,
  label,
  actions,
  ...props
}: FormComponentProps<T, InputProps>) {
  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      defaultValue={defaultValue}
      shouldUnregister={shouldUnregister}
      render={({ field: { onChange, onBlur, value } }) => (
        <YStack gap='$2'>
          {(label || actions) && (
            <XStack justifyContent='space-between' alignItems='center'>
              {label && <Typography.Text fontWeight='600'>{label}</Typography.Text>}
              {renderActions(actions, onChange)}
            </XStack>
          )}
          <RawInput {...props} onBlur={onBlur} onValueChange={onChange} value={value} />
        </YStack>
      )}
    />
  );
}

export function TextArea<T extends FieldValues>({
  name,
  control,
  rules,
  defaultValue,
  shouldUnregister,
  label,
  actions,
  ...props
}: FormComponentProps<T, TextAreaProps>) {
  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      defaultValue={defaultValue}
      shouldUnregister={shouldUnregister}
      render={({ field: { onChange, onBlur, value } }) => (
        <YStack gap='$2'>
          {(label || actions) && (
            <XStack justifyContent='space-between' alignItems='center'>
              {label && <Typography.Text fontWeight='600'>{label}</Typography.Text>}
              {renderActions(actions, onChange)}
            </XStack>
          )}
          <RawTextArea {...props} onBlur={onBlur} onValueChange={onChange} value={value} />
        </YStack>
      )}
    />
  );
}

export function Switch<T extends FieldValues>({
  name,
  control,
  rules,
  defaultValue,
  shouldUnregister,
  label,
  actions,
  ...props
}: FormComponentProps<T, RVSwitchProps>) {
  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      defaultValue={defaultValue}
      shouldUnregister={shouldUnregister}
      render={({ field: { onChange, value } }) => (
        <YStack gap='$2'>
          {(label || actions) && (
            <XStack justifyContent='space-between' alignItems='center'>
              {label && <Typography.Text fontWeight='600'>{label}</Typography.Text>}
              {renderActions(actions, onChange)}
            </XStack>
          )}
          <RawSwitch {...props} onValueChange={onChange} value={value} />
        </YStack>
      )}
    />
  );
}

export function Select<T extends FieldValues>({
  name,
  control,
  rules,
  defaultValue,
  shouldUnregister,
  label,
  actions,
  ...props
}: FormComponentProps<T, SelectProps>) {
  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      defaultValue={defaultValue}
      shouldUnregister={shouldUnregister}
      render={({ field: { onChange, value } }) => (
        <YStack gap='$2'>
          {(label || actions) && (
            <XStack justifyContent='space-between' alignItems='center'>
              {label && <Typography.Text fontWeight='600'>{label}</Typography.Text>}
              {renderActions(actions, onChange)}
            </XStack>
          )}
          <RawSelect {...props} onValueChange={onChange} value={value} />
        </YStack>
      )}
    />
  );
}
