import type { Meta, StoryObj } from '@storybook/react';
import { Flex } from '@sixui/core';
import { action } from '@storybook/addon-actions';

import { RadioGroup } from './RadioGroup';

const FIELD_NAME = 'fieldName';

const ITEMS = [
  { label: 'Option A', value: 'a' },
  { label: 'Option B', value: 'b' },
];

const meta = {
  component: RadioGroup,
  args: {
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
  },
} satisfies Meta<typeof RadioGroup>;

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
        [FIELD_NAME]: 'a',
      },
    },
  },
};

export default meta;
