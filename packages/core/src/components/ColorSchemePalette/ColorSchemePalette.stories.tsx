import type { Meta, StoryObj } from '@storybook/react-vite';

import type { IColorSchemePaletteProps } from './ColorSchemePalette.types';
import { componentShowcaseFactory } from '~/components/ComponentShowcase';
import { ColorSchemePalette } from './ColorSchemePalette';

const meta = {
  component: ColorSchemePalette,
} satisfies Meta<typeof ColorSchemePalette>;

type IStory = StoryObj<typeof meta>;

const defaultArgs = {} satisfies Partial<IColorSchemePaletteProps>;

const ColorSchemePaletteShowcase = componentShowcaseFactory(ColorSchemePalette);
export const Basic: IStory = {
  render: (props) => <ColorSchemePaletteShowcase props={props} />,
  args: defaultArgs,
};

export default meta;
