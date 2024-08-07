import type { Meta, StoryObj } from '@storybook/react';

import type { ITonalPalettesProps } from './TonalPalettes.types';
import { TonalPalettes } from './TonalPalettes';

const meta = {
  component: TonalPalettes,
} satisfies Meta<typeof TonalPalettes>;

type IStory = StoryObj<typeof meta>;

const defaultArgs = {} satisfies Partial<ITonalPalettesProps>;

export const X: IStory = {
  render: (props) => <TonalPalettes {...props} />,
  args: defaultArgs,
};

export default meta;
