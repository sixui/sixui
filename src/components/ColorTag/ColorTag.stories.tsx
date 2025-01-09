import type { Meta, StoryObj } from '@storybook/react';

import type { IColorTagProps } from './ColorTag.types';
import { sbHandleEvent } from '~/helpers/sbHandleEvent';
import { componentShowcaseFactory } from '../ComponentShowcase';
import { ColorTag } from './ColorTag';

const meta = {
  component: ColorTag,
} satisfies Meta<typeof ColorTag>;

type IStory = StoryObj<typeof meta>;

const defaultArgs = {
  onClick: (...args) => sbHandleEvent('onClick', args, 1000),
} satisfies Partial<IColorTagProps>;

const ColorTagShowcase = componentShowcaseFactory(ColorTag);

export const Configurations: IStory = {
  render: (props) => (
    <ColorTagShowcase
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
