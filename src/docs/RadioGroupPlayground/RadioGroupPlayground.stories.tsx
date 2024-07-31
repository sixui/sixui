import type { Meta, StoryObj } from '@storybook/react';

import { RadioGroupPlayground } from './RadioGroupPlayground';

const meta = {
  component: RadioGroupPlayground,
} satisfies Meta<typeof RadioGroupPlayground>;

type IStory = StoryObj<typeof meta>;

export const Basic: IStory = {
  render: (props) => <RadioGroupPlayground {...props} />,
};

export default meta;
