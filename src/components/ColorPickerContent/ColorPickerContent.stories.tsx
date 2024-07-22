import type { Meta, StoryObj } from '@storybook/react';

import type { IColorPickerContentProps } from './ColorPickerContent.types';
import { sbHandleEvent } from '@/helpers/sbHandleEvent';
import { ColorPickerContent } from './ColorPickerContent';

const meta = {
  component: ColorPickerContent,
} satisfies Meta<typeof ColorPickerContent>;

type IStory = StoryObj<typeof meta>;

const defaultArgs = {
  onClick: (...args) => void sbHandleEvent('click', args),
  palettes: [
    ['#ef6c6c', '#e61919', '#931010'],
    ['#d56cef', '#bd19e6', '#791093'],
    ['#6c82ef', '#193ce6', '#102693'],
    ['#6cddef', '#19cae6', '#108193'],
    ['#6cef84', '#19e63f', '#109328'],
    ['#efc16c', '#e69e19', '#936510'],
  ],
} satisfies Partial<IColorPickerContentProps>;

export const Basic: IStory = {
  render: (props) => <ColorPickerContent {...props} />,
  args: defaultArgs,
};

export const Selected: IStory = {
  render: (props) => <ColorPickerContent {...props} />,
  args: {
    ...defaultArgs,
    selectedColor: '#e61919',
  },
};

export const CustomColors: IStory = {
  render: (props) => <ColorPickerContent {...props} />,
  args: {
    ...defaultArgs,
    customColors: ['#000000', '#444444', '#888888', '#cccccc'],
  },
};

export const CustomSelected: IStory = {
  render: (props) => <ColorPickerContent {...props} />,
  args: {
    ...defaultArgs,
    customColors: ['#000000', '#444444', '#888888', '#cccccc'],
    selectedColor: '#444444',
  },
};

export default meta;
