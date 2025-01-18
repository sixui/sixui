import type { Meta, StoryObj } from '@storybook/react';

import type { IBoxProps } from './Box.types';
import { componentShowcaseFactory } from '../ComponentShowcase';
import { Paper } from '../Paper';
import { Box } from './Box';

const meta = {
  component: Box,
} satisfies Meta<typeof Box>;

type IStory = StoryObj<typeof meta>;

const defaultArgs = {
  children: <Paper surface="$primary" w="$8" h="$8" shape="$xs" />,
} satisfies Partial<IBoxProps>;

const BoxShowcase = componentShowcaseFactory(Box);

export const Responsive: IStory = {
  render: (props) => (
    <BoxShowcase
      props={props}
      cols={[
        {
          legend: 'compact',
          props: {
            hiddenFrom: 'compact',
            visibleFrom: 'compact',
          },
        },
        {
          legend: 'medium',
          props: {
            hiddenFrom: 'medium',
            visibleFrom: 'medium',
          },
        },
        {
          legend: 'expanded',
          props: {
            hiddenFrom: 'expanded',
            visibleFrom: 'expanded',
          },
        },
        {
          legend: 'large',
          props: {
            hiddenFrom: 'large',
            visibleFrom: 'large',
          },
        },
      ]}
      rows={[
        {
          legend: 'Hidden from',
          props: {
            visibleFrom: undefined,
          },
        },
        {
          legend: 'Visible from',
          props: {
            hiddenFrom: undefined,
          },
        },
      ]}
    />
  ),
  args: defaultArgs,
};

export default meta;
