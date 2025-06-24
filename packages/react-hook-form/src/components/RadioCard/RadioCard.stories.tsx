import type { Meta, StoryObj } from '@storybook/react-vite';
import { action } from 'storybook/actions';

import { RadioCard } from './RadioCard';

const FIELD_NAME = 'fieldName';

const meta = {
  component: RadioCard,
  args: {
    name: FIELD_NAME,
    onChange: (...args) => {
      action('onChange')(args);
    },
    label: 'Label',
  },
} satisfies Meta<typeof RadioCard>;

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
