import type { Meta, StoryObj } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import type { ITextInputProps } from './TextInput';
import { TextInput } from './TextInput';

const FIELD_NAME = 'fieldName';

const meta = {
  component: TextInput,
} satisfies Meta<typeof TextInput>;

type IStory = StoryObj<typeof meta>;

const defaultArgs = {
  onChange: (...args) => {
    action('onChange')(args);
  },
  label: 'Label',
  name: FIELD_NAME,
} satisfies Partial<ITextInputProps>;

export const Basic: IStory = {
  args: defaultArgs,
};

export const Required: IStory = {
  args: {
    ...defaultArgs,
    required: true,
  },
};

export const WithDefaultValue: IStory = {
  args: defaultArgs,
  parameters: {
    form: {
      defaultValues: {
        [FIELD_NAME]: 'Default value',
      },
    },
  },
};

export default meta;
