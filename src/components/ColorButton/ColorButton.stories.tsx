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
          legend: 'Empty',
        },
        {
          legend: 'With color',
          props: {
            backgroundColor: '#6750a4',
          },
        },
        {
          legend: 'With label',
          props: {
            backgroundColor: '#6750a4',
            children: '#6750a4',
          },
        },
        {
          legend: 'Selected',
          props: {
            backgroundColor: '#6750a4',
            selected: true,
          },
        },
      ]}
    />
  ),
  args: defaultArgs,
};

export default meta;
