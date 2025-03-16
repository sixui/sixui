import type { Meta, StoryObj } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import type { IRadioCardProps } from './RadioCard';
import { RadioCard } from './RadioCard';

const FIELD_NAME = 'fieldName';

const meta = {
  component: RadioCard,
} satisfies Meta<typeof RadioCard>;

type IStory = StoryObj<typeof meta>;

const defaultArgs = {
  name: FIELD_NAME,
  onChange: (...args) => {
    action('onChange')(args);
  },
  label: 'Label',
} satisfies Partial<IRadioCardProps>;

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
        [FIELD_NAME]: true,
      },
    },
  },
};

export default meta;
