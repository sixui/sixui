import type { Meta, StoryObj } from '@storybook/react';
import { Flex } from '@sixui/core';
import { action } from '@storybook/addon-actions';

import type { IRadioGroupProps } from './RadioGroup';
import { RadioGroup } from './RadioGroup';

const FIELD_NAME = 'fieldName';

const meta = {
  component: RadioGroup,
} satisfies Meta<typeof RadioGroup>;

type IStory = StoryObj<typeof meta>;

const ITEMS = [
  { label: 'Option A', value: 'a' },
  { label: 'Option B', value: 'b' },
];

const defaultArgs = {
  name: FIELD_NAME,
  onChange: (...args) => {
    action('onChange')(args);
  },
  label: 'Label',
  children: (
    <Flex direction="column" mt="$sm" gap="$md">
      {ITEMS.map((item, itemIndex) => (
        <RadioGroup.Item key={itemIndex} {...item} />
      ))}
    </Flex>
  ),
} satisfies Partial<IRadioGroupProps>;

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
        [FIELD_NAME]: 'a',
      },
    },
  },
};

export default meta;
