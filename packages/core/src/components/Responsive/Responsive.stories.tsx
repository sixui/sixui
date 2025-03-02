import type { Meta, StoryObj } from '@storybook/react';
import { capitalizeFirstLetter } from '@olivierpascal/helpers';
import cx from 'clsx';

import type { IPaperProps } from '~/components/Paper';
import { Box } from '~/components/Box';
import { componentShowcaseFactory } from '~/components/ComponentShowcase';
import { windowSizeClassNames } from '~/components/Theme';
import { responsiveStoriesClassNames } from './Responsive.stories.css';

const meta = {
  component: Box,
} satisfies Meta<typeof Box>;

type IStory = StoryObj<typeof meta>;

const defaultArgs = {
  w: '$8',
  h: '$8',
  className: responsiveStoriesClassNames.root,
} satisfies Partial<IPaperProps>;

const ResponsivePaperShowcase = componentShowcaseFactory(Box);

export const ContainerQueries: IStory = {
  render: (props) => (
    <ResponsivePaperShowcase
      props={props}
      cols={windowSizeClassNames.map((windowSizeClassName) => ({
        legend: capitalizeFirstLetter(windowSizeClassName),
        props: {
          className: cx(
            defaultArgs.className,
            responsiveStoriesClassNames[`root$eq$${windowSizeClassName}`],
          ),
        },
      }))}
    />
  ),
  args: defaultArgs,
};

export const Properties: IStory = {
  render: (props) => (
    <ResponsivePaperShowcase
      props={props}
      cols={windowSizeClassNames.map((windowSizeClassName) => ({
        legend: capitalizeFirstLetter(windowSizeClassName),
        props: {
          opacity: {
            [windowSizeClassName]: '1',
          },
          bg: {
            [windowSizeClassName]: '$primary',
          },
        },
      }))}
    />
  ),
  args: defaultArgs,
};

export default meta;
