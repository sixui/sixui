import type { Meta, StoryObj } from '@storybook/react-vite';
import { action } from 'storybook/actions';

import { ColorInput } from './ColorInput';

const FIELD_NAME = 'fieldName';

const meta = {
  component: ColorInput,
  args: {
    name: FIELD_NAME,
    onChange: (...args) => {
      action('onChange')(args);
    },
    label: 'Label',
  },
} satisfies Meta<typeof ColorInput>;

type IStory = StoryObj<typeof meta>;

export const Basic: IStory = {};

export const Required: IStory = {
  args: {
    required: true,
  },
};

export const WithDefaultValue: IStory = {
  parameters: {
    form: {
      defaultValues: {
        [FIELD_NAME]: '#6750a4',
      },
    },
  },
};

export default meta;
