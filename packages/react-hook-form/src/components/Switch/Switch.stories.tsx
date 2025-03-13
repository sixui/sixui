import type { Meta, StoryObj } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import type { ISwitchProps } from './Switch';
import { Switch } from './Switch';

const FIELD_NAME = 'fieldName';

const meta = {
  component: Switch,
} satisfies Meta<typeof Switch>;

type IStory = StoryObj<typeof meta>;

const defaultArgs = {
  onChange: (...args) => {
    action('onChange')(args);
  },
  label: 'Label',
  name: FIELD_NAME,
} satisfies Partial<ISwitchProps>;

export const Basic: IStory = {
  args: defaultArgs,
};

export const Required: IStory = {
  args: {
    ...defaultArgs,
    required: true,
  },
};

export const DefaultChecked: IStory = {
  args: defaultArgs,
  parameters: {
    form: {
      defaultValues: {
        [FIELD_NAME]: true,
      },
    },
  },
};

export default meta;
