import type { Meta, StoryObj } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import type { ISearchBarProps } from './SearchBar';
import { SearchBar } from './SearchBar';

const FIELD_NAME = 'fieldName';

const meta = {
  component: SearchBar,
} satisfies Meta<typeof SearchBar>;

type IStory = StoryObj<typeof meta>;

const defaultArgs = {
  onChange: (...args) => {
    action('onChange')(args);
  },
  name: FIELD_NAME,
} satisfies Partial<ISearchBarProps>;

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
