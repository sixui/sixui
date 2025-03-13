import type { Meta, StoryObj } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import type { IColorInputProps } from './ColorInput';
import { ColorInput } from './ColorInput';

const FIELD_NAME = 'fieldName';

const meta = {
  component: ColorInput,
} satisfies Meta<typeof ColorInput>;

type IStory = StoryObj<typeof meta>;

const defaultArgs = {
  name: FIELD_NAME,
  onChange: (...args) => {
    action('onChange')(args);
  },
  label: 'Label',
} satisfies Partial<IColorInputProps>;

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
        [FIELD_NAME]: '#6750a4',
      },
    },
  },
};

export default meta;
