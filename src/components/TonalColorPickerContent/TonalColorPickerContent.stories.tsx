import type { Meta, StoryObj } from '@storybook/react';

import type { ITonalColorPickerContentProps } from './TonalColorPickerContent.types';
import { TonalColorPickerContent } from './TonalColorPickerContent';

const meta = {
  component: TonalColorPickerContent,
} satisfies Meta<typeof TonalColorPickerContent>;

type IStory = StoryObj<typeof meta>;

const defaultArgs = {} satisfies Partial<ITonalColorPickerContentProps>;

export const Basic: IStory = {
  render: (props) => <TonalColorPickerContent {...props} />,
  args: defaultArgs,
};

export const Fixed: IStory = {
  render: (props) => <TonalColorPickerContent {...props} />,
  args: {
    ...defaultArgs,
    fixedColorScheme: true,
  },
};

export const SourceColor: IStory = {
  render: (props) => <TonalColorPickerContent {...props} />,
  args: {
    ...defaultArgs,
    primaryColor: '#00ff00',
  },
};

export const SourceScheme: IStory = {
  render: (props) => <TonalColorPickerContent {...props} />,
  args: {
    ...defaultArgs,
    primaryColor: {
      light: '#00ff00',
      dark: '#92d78f',
    },
  },
};

export default meta;
