import type { Meta, StoryObj } from '@storybook/react';

import { RadioPlayground } from './RadioPlayground';

const meta = {
  component: RadioPlayground,
} satisfies Meta<typeof RadioPlayground>;

type IStory = StoryObj<typeof meta>;

export const Basic: IStory = {
  render: (props) => <RadioPlayground {...props} />,
};

export default meta;
