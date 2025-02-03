import type { Meta, StoryObj } from '@storybook/react';
import { capitalizeFirstLetter } from '@olivierpascal/helpers';

import type { IBoxProps } from './Box.types';
import { componentShowcaseFactory } from '~/components/ComponentShowcase';
import { themeTokens, windowSizeClassNames } from '~/components/Theme';
import { Box } from './Box';

const meta = {
  component: Box,
} satisfies Meta<typeof Box>;

type IStory = StoryObj<typeof meta>;

const defaultArgs = {} satisfies Partial<IBoxProps>;

const BoxShowcase = componentShowcaseFactory(Box);

export const ResponsiveVisibility: IStory = {
  render: (props) => (
    <BoxShowcase
      props={props}
      cols={windowSizeClassNames
        .filter((windowSize) => windowSize !== 'extraLarge')
        .map((windowSize) => ({
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
  args: {
    ...defaultArgs,
    w: '$8',
    h: '$8',
    br: '$1',
    bg: '$primary',
  },
};

export const ResponsiveProperties: IStory = {
  render: (props) => (
    <BoxShowcase
      props={props}
      cols={windowSizeClassNames.map((windowSize) => ({
        legend: capitalizeFirstLetter(windowSize),
        props: {
          bg: {
            base: '$onSurface',
            [windowSize]: '$primary',
          },
          opacity: {
            base: themeTokens.state.containerOpacity.disabled,
            [windowSize]: '1',
          },
        },
      }))}
    />
  ),
  args: {
    ...defaultArgs,
    w: '$8',
    h: '$8',
    br: '$1',
  },
};

export default meta;
