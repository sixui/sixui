import type { Meta, StoryObj } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import type { ICheckboxCardProps } from './CheckboxCard';
import { CheckboxCard } from './CheckboxCard';

const FIELD_NAME = 'fieldName';

const meta = {
  component: CheckboxCard,
} satisfies Meta<typeof CheckboxCard>;

type IStory = StoryObj<typeof meta>;

const defaultArgs = {
  name: FIELD_NAME,
  onChange: (...args) => {
    action('onChange')(args);
  },
  label: 'Label',
} satisfies Partial<ICheckboxCardProps>;

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
