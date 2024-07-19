import type { Meta, StoryObj } from '@storybook/react';

import type { IColorPickerContentProps } from './ColorPickerContent.types';
import { ColorPickerContent } from './ColorPickerContent';

const meta = {
  component: ColorPickerContent,
} satisfies Meta<typeof ColorPickerContent>;

type IStory = StoryObj<typeof meta>;

const defaultArgs = {
  // sourceColor: '#ff0000',
} satisfies Partial<IColorPickerContentProps>;

export const Basic: IStory = {
  render: (props) => <ColorPickerContent {...props} />,
  args: defaultArgs,
};

export const Fixed: IStory = {
  render: (props) => <ColorPickerContent {...props} />,
  args: {
    ...defaultArgs,
    fixedColorScheme: true,
  },
};

export default meta;
