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
    selectedColor: '#8069bf',
  },
};

export const Fixed: IStory = {
  render: (props) => <TonalColorPickerContent {...props} />,
  args: {
    ...defaultArgs,
    fixedColorScheme: true,
  },
};

export const CustomColors: IStory = {
  render: (props) => <TonalColorPickerContent {...props} />,
  args: {
    ...defaultArgs,
    customColors: ['#000', '#444', '#888', '#ccc'],
  },
};

export const CustomSelected: IStory = {
  render: (props) => <TonalColorPickerContent {...props} />,
  args: {
    ...defaultArgs,
    customColors: ['#000', '#444', '#888', '#ccc'],
    selectedColor: '#444',
  },
};

export const SourceColor: IStory = {
  render: (props) => <TonalColorPickerContent {...props} />,
  args: {
    ...defaultArgs,
    sourceColor: '#00ff00',
  },
};

export const SourceScheme: IStory = {
  render: (props) => <TonalColorPickerContent {...props} />,
  args: {
    ...defaultArgs,
    sourceColor: {
      light: '#00ff00',
      dark: '#92d78f',
    },
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
