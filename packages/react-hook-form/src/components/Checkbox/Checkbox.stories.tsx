import type { Meta, StoryObj } from '@storybook/react-vite';
import { action } from 'storybook/actions';

import { Checkbox } from './Checkbox';

const FIELD_NAME = 'fieldName';

const meta = {
  component: Checkbox,
  args: {
    name: FIELD_NAME,
    label: 'Label',
    onChange: (...args) => {
      action('onChange')(...args);
    },
  },
} satisfies Meta<typeof Checkbox>;

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
        [FIELD_NAME]: true,
      },
    },
  },
};

export default meta;
