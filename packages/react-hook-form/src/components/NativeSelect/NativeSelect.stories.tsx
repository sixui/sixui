import type { Meta, StoryObj } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import type { INativeSelectProps } from './NativeSelect';
import { NativeSelect } from './NativeSelect';

const FIELD_NAME = 'fieldName';
const ITEMS = [
  { value: 'option1', label: 'Option 1' },
  { value: 'option2', label: 'Option 2' },
  { value: 'option3', label: 'Option 3' },
];

const meta = {
  component: NativeSelect,
} satisfies Meta<typeof NativeSelect>;

type IStory = StoryObj<typeof meta>;

const defaultArgs = {
  name: FIELD_NAME,
  onChange: (...args) => {
    action('onChange')(args);
  },
  label: 'Label',
  items: ITEMS,
} satisfies Partial<INativeSelectProps>;

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
        [FIELD_NAME]: 'option2',
      },
    },
  },
};

export default meta;
