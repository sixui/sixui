import type { Meta, StoryObj } from '@storybook/react';

import type { IColorTagProps } from './ColorTag.types';
import { ComponentShowcase } from '@/components/ComponentShowcase';
import { IconCheckMark } from '@/components/Icons';
import { ColorTag } from './ColorTag';

const meta = {
  component: ColorTag,
} satisfies Meta<typeof ColorTag>;

type IStory = StoryObj<typeof meta>;

const defaultArgs = {} satisfies Partial<IColorTagProps>;

export const Configurations: IStory = {
  render: (props) => (
    <ComponentShowcase
      component={ColorTag}
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
            label: '#6750a4',
          },
        },
        {
          legend: 'With icon',
          props: {
            backgroundColor: '#6750a4',
            icon: <IconCheckMark aria-hidden />,
          },
        },
        {
          legend: 'With invalid color',
          props: {
            backgroundColor: 'invalid',
          },
        },
      ]}
    />
  ),
  args: defaultArgs,
};

export default meta;
