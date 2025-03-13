import type { Meta, StoryObj } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import type { IMultiSelectProps } from './MultiSelect';
import { MultiSelect } from './MultiSelect';

const FIELD_NAME = 'fieldName';
const ITEMS = [
  { value: 'option1', label: 'Option 1' },
  { value: 'option2', label: 'Option 2' },
  { value: 'option3', label: 'Option 3' },
];

const meta = {
  component: MultiSelect,
} satisfies Meta<typeof MultiSelect>;

type IStory = StoryObj<typeof meta>;

const defaultArgs = {
  onChange: (...args) => {
    action('onChange')(args);
  },
  label: 'Label',
  name: FIELD_NAME,
  items: ITEMS,
} satisfies Partial<IMultiSelectProps>;

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
        [FIELD_NAME]: ['option2', 'option3'],
      },
    },
  },
};

export default meta;
