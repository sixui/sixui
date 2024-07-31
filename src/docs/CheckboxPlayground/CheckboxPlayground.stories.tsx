import type { Meta, StoryObj } from '@storybook/react';

import { CheckboxPlayground } from './CheckboxPlayground';

const meta = {
  component: CheckboxPlayground,
} satisfies Meta<typeof CheckboxPlayground>;

type IStory = StoryObj<typeof meta>;

export const Basic: IStory = {
  render: (props) => <CheckboxPlayground {...props} />,
};

export default meta;
