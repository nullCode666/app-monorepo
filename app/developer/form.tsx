import React from 'react';
import { Alert } from 'react-native';

import { Button, Form, Typography, YStack } from '@/core/components';
import { DemoPage, DemoSection } from '@/core/views/developer/DemoComponents';

type FormData = {
  firstName: string;
  lastName: string;
  bio: string;
};

export default function FormDemoScreen() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = Form.useForm<FormData>({
    defaultValues: {
      firstName: '',
      lastName: '',
      bio: '',
    },
  });

  const onSubmit: Form.SubmitHandler<FormData> = (data) => {
    Alert.alert('Form Submitted', JSON.stringify(data, null, 2));
  };

  return (
    <DemoPage>
      <DemoSection title='Input Integration'>
        <YStack gap='$4'>
          <Form.Input
            control={control}
            rules={{ required: true }}
            name='firstName'
            label='First Name (Required)'
            placeholder='Enter first name'
          />
          {errors.firstName && <Typography.Text color='$red10'>This is required.</Typography.Text>}

          <Form.Input
            control={control}
            rules={{ maxLength: 100 }}
            name='lastName'
            label='Last Name'
            placeholder='Enter last name'
          />
        </YStack>
      </DemoSection>

      <DemoSection title='TextArea Integration'>
        <Form.TextArea
          control={control}
          name='bio'
          label='Bio'
          placeholder='Tell us about yourself'
          actions={[
            { type: 'paste' },
            {
              type: 'scan',
              onPress: () => {
                // console.log('Scan pressed');
              },
            },
          ]}
        />
      </DemoSection>

      <Button onPress={handleSubmit(onSubmit)}>Submit</Button>
    </DemoPage>
  );
}
