import type { Meta, StoryObj } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import { Switch } from './Switch';

const FIELD_NAME = 'fieldName';

const meta = {
  component: Switch,
  args: {
    name: FIELD_NAME,
    onChange: (...args) => {
      action('onChange')(args);
    },
    label: 'Label',
  },
} satisfies Meta<typeof Switch>;

type IStory = StoryObj<typeof meta>;

export const Basic: IStory = {};

export const Required: IStory = {
  args: {
    required: true,
  },
};

export const DefaultChecked: IStory = {
  parameters: {
    form: {
      defaultValues: {
        [FIELD_NAME]: true,
      },
    },
  },
};

export default meta;
