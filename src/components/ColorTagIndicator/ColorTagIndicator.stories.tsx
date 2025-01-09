import type { Meta, StoryObj } from '@storybook/react';

import type { IColorTagIndicatorProps } from './ColorTagIndicator.types';
import { iconCheckMark } from '~/assets/icons';
import { componentShowcaseFactory } from '../ComponentShowcase';
import { SvgIcon } from '../SvgIcon';
import { ColorTagIndicator } from './ColorTagIndicator';

const meta = {
  component: ColorTagIndicator,
} satisfies Meta<typeof ColorTagIndicator>;

type IStory = StoryObj<typeof meta>;

const defaultArgs = {} satisfies Partial<IColorTagIndicatorProps>;

const ColorTagIndicatorShowcase = componentShowcaseFactory(ColorTagIndicator);

export const Configurations: IStory = {
  render: (props) => (
    <ColorTagIndicatorShowcase
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
            icon: <SvgIcon icon={iconCheckMark} />,
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
