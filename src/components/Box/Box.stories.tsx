import type { Meta, StoryObj } from '@storybook/react';
import { capitalizeFirstLetter } from '@olivierpascal/helpers';

import type { IThemeWindowSizeClassName } from '../ThemeProvider';
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
      cols={(
        [
          'compact',
          'medium',
          'expanded',
          'large',
          'extraLarge',
        ] as Array<IThemeWindowSizeClassName>
      ).map((windowSize) => ({
        legend: capitalizeFirstLetter(windowSize),
        props: {
          hiddenFrom: windowSize,
          visibleFrom: windowSize,
        },
      }))}
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
