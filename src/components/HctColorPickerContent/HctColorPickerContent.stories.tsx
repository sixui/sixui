import type { Meta, StoryObj } from '@storybook/react';

import type { IHctColorPickerContentProps } from './HctColorPickerContent.types';
import { sbHandleEvent } from '~/helpers/sbHandleEvent';
import { HctColorPickerContent } from './HctColorPickerContent';

const meta = {
  component: HctColorPickerContent,
} satisfies Meta<typeof HctColorPickerContent>;

type IStory = StoryObj<typeof meta>;

const defaultArgs = {
  onClick: (...args) => void sbHandleEvent('click', args),
} satisfies Partial<IHctColorPickerContentProps>;

export const Basic: IStory = {
  render: (props) => <HctColorPickerContent {...props} />,
  args: defaultArgs,
};

export const HideNeutral: IStory = {
  render: (props) => <HctColorPickerContent {...props} />,
  args: {
    ...defaultArgs,
    hideNeutral: true,
  },
};

export const CustomSourceColor: IStory = {
  render: (props) => <HctColorPickerContent {...props} />,
  args: {
    ...defaultArgs,
    sourceColor: '#ffff00',
  },
};

export const InvalidSourceColor: IStory = {
  render: (props) => <HctColorPickerContent {...props} />,
  args: {
    ...defaultArgs,
    sourceColor: 'invalid',
  },
};

export default meta;
