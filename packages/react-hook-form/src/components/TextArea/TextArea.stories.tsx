import type { Meta, StoryObj } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import { TextArea } from './TextArea';

const FIELD_NAME = 'fieldName';

const meta = {
  component: TextArea,
  args: {
    name: FIELD_NAME,
    onChange: (...args) => {
      action('onChange')(args);
    },
    label: 'Label',
  },
} satisfies Meta<typeof TextArea>;

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
        [FIELD_NAME]: 'Default value',
      },
    },
  },
};

export default meta;
