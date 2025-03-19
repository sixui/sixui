import type { IAny } from '@sixui/core';
import type { Meta, StoryObj } from '@storybook/react';
import { Flex } from '@sixui/core';
import { action } from '@storybook/addon-actions';

import type { ICheckboxGroupProps } from './CheckboxGroup';
import { CheckboxGroup } from './CheckboxGroup';

const FIELD_NAME = 'fieldName';

const CheckboxGroupDemo: React.FC<ICheckboxGroupProps<IAny>> = (props) => (
  <CheckboxGroup {...props}>
    <Flex direction="column" mt="$sm" gap="$md">
      <CheckboxGroup.Item value="a" label="Option A" />
      <CheckboxGroup.Item value="b" label="Option B" />
    </Flex>
  </CheckboxGroup>
);

const meta = {
  component: CheckboxGroupDemo,
  args: {
    name: FIELD_NAME,
    onChange: (...args) => {
      action('onChange')(args);
    },
    label: 'Label',
  },
} satisfies Meta<typeof CheckboxGroupDemo>;

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
        [FIELD_NAME]: ['a'],
      },
    },
  },
};

export default meta;
