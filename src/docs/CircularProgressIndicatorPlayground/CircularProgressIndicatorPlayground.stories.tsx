import type { Meta, StoryObj } from '@storybook/react';

import { CircularProgressIndicatorPlayground } from './CircularProgressIndicatorPlayground';

const meta = {
  component: CircularProgressIndicatorPlayground,
} satisfies Meta<typeof CircularProgressIndicatorPlayground>;

type IStory = StoryObj<typeof meta>;

export const Basic: IStory = {
  render: (props) => <CircularProgressIndicatorPlayground {...props} />,
};

export default meta;
