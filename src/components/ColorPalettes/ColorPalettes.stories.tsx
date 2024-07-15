import type { Meta, StoryObj } from '@storybook/react';

import { ColorPalettes, type IColorPalettesProps } from './ColorPalettes';

const meta = {
  component: ColorPalettes,
} satisfies Meta<typeof ColorPalettes>;

type IStory = StoryObj<typeof meta>;

const defaultArgs = {} satisfies Partial<IColorPalettesProps>;

export const TonalPalettes: IStory = {
  render: (props) => <ColorPalettes {...props} />,
  args: defaultArgs,
};

export default meta;
