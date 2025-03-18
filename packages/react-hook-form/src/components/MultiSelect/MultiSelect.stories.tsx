import type { Meta, StoryObj } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import { MultiSelect } from './MultiSelect';

const FIELD_NAME = 'fieldName';
const ITEMS = [
  { value: 'option1', label: 'Option 1' },
  { value: 'option2', label: 'Option 2' },
  { value: 'option3', label: 'Option 3' },
];

const meta = {
  component: MultiSelect,
  args: {
    name: FIELD_NAME,
    onChange: (...args) => {
      action('onChange')(args);
    },
    label: 'Label',
    items: ITEMS,
  },
} satisfies Meta<typeof MultiSelect>;

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
        [FIELD_NAME]: ['option2', 'option3'],
      },
    },
  },
};

export default meta;
