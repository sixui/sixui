import type { Meta, StoryObj } from '@storybook/react-vite';
import { action } from 'storybook/actions';

import { TextInput } from './TextInput';

const FIELD_NAME = 'fieldName';

const meta = {
  component: TextInput,
  args: {
    name: FIELD_NAME,
    onChange: (...args) => {
      action('onChange')(args);
    },
    label: 'Label',
  },
} satisfies Meta<typeof TextInput>;

type IStory = StoryObj<typeof meta>;

export const Basic: IStory = {};

export const AsNumber: IStory = {
  args: {
    type: 'number',
  },
};

export const Required: IStory = {
  args: {
    required: true,
  },
};

export const WithDefaultValue: IStory = {
  parameters: {
    form: {
      defaultValues: {
        [FIELD_NAME]: 'Default value',
      },
    },
  },
};

export default meta;
