import type { Meta, StoryObj } from '@storybook/react-vite';

import type { IColorSchemeProps } from './ColorScheme.types';
import { componentShowcaseFactory } from '~/components/ComponentShowcase';
import { ColorScheme } from './ColorScheme';

const meta = {
  component: ColorScheme,
} satisfies Meta<typeof ColorScheme>;

type IStory = StoryObj<typeof meta>;

const defaultArgs = {} satisfies Partial<IColorSchemeProps>;

const ColorSchemeShowcase = componentShowcaseFactory(ColorScheme);
export const Basic: IStory = {
  render: (props) => <ColorSchemeShowcase props={props} />,
  args: defaultArgs,
};

export default meta;
