import type { Meta, StoryObj } from '@storybook/react';

import { SwitchPlayground } from './SwitchPlayground';

const meta = {
  component: SwitchPlayground,
} satisfies Meta<typeof SwitchPlayground>;

type IStory = StoryObj<typeof meta>;

export const Basic: IStory = {
  render: (props) => <SwitchPlayground {...props} />,
};

export default meta;
