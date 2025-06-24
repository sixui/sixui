import type { Meta, StoryObj } from '@storybook/react-vite';
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
  w: '32px',
  h: '32px',
  className: responsiveStoriesClassNames.root,
} satisfies Partial<IPaperProps>;

const ResponsivePaperShowcase = componentShowcaseFactory(Box);

export const ContainerQueriesEqual: IStory = {
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

export const ContainerQueriesGreaterOrEqual: IStory = {
  render: (props) => (
    <ResponsivePaperShowcase
      props={props}
      cols={windowSizeClassNames.map((windowSizeClassName) => ({
        legend: capitalizeFirstLetter(windowSizeClassName),
        props: {
          className: cx(
            defaultArgs.className,
            responsiveStoriesClassNames[`root$gte$${windowSizeClassName}`],
          ),
        },
      }))}
    />
  ),
  args: defaultArgs,
};

export default meta;
