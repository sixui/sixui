import type { Meta, StoryObj } from '@storybook/react-vite';
import { capitalizeFirstLetter } from '@olivierpascal/helpers';

import { componentShowcaseFactory } from '~/components/ComponentShowcase';
import { windowSizeClassNames } from '~/components/Theme';
import { themeTokens } from '~/components/Theme/theme.css';
import { Box } from './Box';

const meta = {
  component: Box,
} satisfies Meta<typeof Box>;

type IStory = StoryObj<typeof meta>;

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
    w: '32px',
    h: '32px',
    br: '4px',
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
    w: '32px',
    h: '32px',
    br: '4px',
  },
};

export default meta;
