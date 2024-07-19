import type { Meta, StoryObj } from '@storybook/react';

import type { IColorButtonProps } from './ColorButton.types';
import { ComponentShowcase } from '@/components/ComponentShowcase';
import { ColorButton } from './ColorButton';

const meta = {
  component: ColorButton,
} satisfies Meta<typeof ColorButton>;

type IStory = StoryObj<typeof meta>;

const defaultArgs = {} satisfies Partial<IColorButtonProps>;

export const Configurations: IStory = {
  render: (props) => (
    <ComponentShowcase
      component={ColorButton}
      props={props}
      cols={[
        {
          legend: 'Normal',
        },
        {
          legend: 'With color',
          props: {
            backgroundColorHex: '#6750a4',
            foregroundColorHex: '#ffffff',
          },
        },
        {
          legend: 'With label',
          props: {
            backgroundColorHex: '#6750a4',
            foregroundColorHex: '#ffffff',
            children: '#6750a4',
          },
        },
        {
          legend: 'Selected',
          props: {
            backgroundColorHex: '#6750a4',
            foregroundColorHex: '#ffffff',
            selected: true,
          },
        },
      ]}
    />
  ),
  args: defaultArgs,
};

export default meta;
