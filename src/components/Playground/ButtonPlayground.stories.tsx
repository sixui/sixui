import type { Meta, StoryObj } from '@storybook/react';

import type { IButtonPlaygroundProps } from './ButtonPlayground.types';
import { ButtonPlayground } from './ButtonPlayground';

const meta = {
  component: ButtonPlayground,
} satisfies Meta<typeof ButtonPlayground>;

type IStory = StoryObj<typeof meta>;

const defaultArgs = {} satisfies Partial<IButtonPlaygroundProps>;

export const Basic: IStory = {
  render: (props) => <ButtonPlayground {...props} />,
  args: defaultArgs,
};

export default meta;
