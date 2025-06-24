import type { Meta, StoryObj } from '@storybook/react-vite';
import { action } from 'storybook/actions';

import { SearchBar } from './SearchBar';

const FIELD_NAME = 'fieldName';

const meta = {
  component: SearchBar,
  args: {
    name: FIELD_NAME,
    onChange: (...args) => {
      action('onChange')(args);
    },
  },
} satisfies Meta<typeof SearchBar>;

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
