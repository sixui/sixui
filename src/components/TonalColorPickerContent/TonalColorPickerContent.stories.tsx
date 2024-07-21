import type { Meta, StoryObj } from '@storybook/react';

import type { ITonalColorPickerContentProps } from './TonalColorPickerContent.types';
import { sbHandleEvent } from '@/helpers/sbHandleEvent';
import { TonalColorPickerContent } from './TonalColorPickerContent';

const meta = {
  component: TonalColorPickerContent,
} satisfies Meta<typeof TonalColorPickerContent>;

type IStory = StoryObj<typeof meta>;

const defaultArgs = {
  onClick: (...args) => void sbHandleEvent('click', args),
} satisfies Partial<ITonalColorPickerContentProps>;

export const Basic: IStory = {
  render: (props) => <TonalColorPickerContent {...props} />,
  args: defaultArgs,
};

export const Selected: IStory = {
  render: (props) => <TonalColorPickerContent {...props} />,
  args: {
    ...defaultArgs,
    selectedColor: '#6750a4',
  },
};

export const CustomColors: IStory = {
  render: (props) => <TonalColorPickerContent {...props} />,
  args: {
    ...defaultArgs,
    customColors: ['#000000', '#444444', '#888888', '#cccccc'],
  },
};

export const CustomSelected: IStory = {
  render: (props) => <TonalColorPickerContent {...props} />,
  args: {
    ...defaultArgs,
    customColors: ['#000000', '#444444', '#888888', '#cccccc'],
    selectedColor: '#444444',
  },
};

export const CustomSourceColor: IStory = {
  render: (props) => <TonalColorPickerContent {...props} />,
  args: {
    ...defaultArgs,
    sourceColor: '#00ff00',
  },
};

export const InvalidSourceColor: IStory = {
  render: (props) => <TonalColorPickerContent {...props} />,
  args: {
    ...defaultArgs,
    sourceColor: 'invalid',
  },
};

export default meta;
