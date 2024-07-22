import type { Meta, StoryObj } from '@storybook/react';

import type { IHslColorPickerContentProps } from './HslColorPickerContent.types';
import { sbHandleEvent } from '@/helpers/sbHandleEvent';
import { HslColorPickerContent } from './HslColorPickerContent';

const meta = {
  component: HslColorPickerContent,
} satisfies Meta<typeof HslColorPickerContent>;

type IStory = StoryObj<typeof meta>;

const defaultArgs = {
  onClick: (...args) => void sbHandleEvent('click', args),
} satisfies Partial<IHslColorPickerContentProps>;

export const Basic: IStory = {
  render: (props) => <HslColorPickerContent {...props} />,
  args: defaultArgs,
};

export const NoGrayscale: IStory = {
  render: (props) => <HslColorPickerContent {...props} />,
  args: {
    ...defaultArgs,
    noGrayscale: true,
  },
};

export const Desaturated: IStory = {
  render: (props) => <HslColorPickerContent {...props} />,
  args: {
    ...defaultArgs,
    saturation: 40,
  },
};

export default meta;
