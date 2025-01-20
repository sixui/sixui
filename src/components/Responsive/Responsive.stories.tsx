import type { Meta, StoryObj } from '@storybook/react';
import { capitalizeFirstLetter } from '@olivierpascal/helpers';
import clsx from 'clsx';

import type { IPaperProps } from '../Paper';
import { componentShowcaseFactory } from '../ComponentShowcase';
import { Paper } from '../Paper';
import { windowSizeClassNames } from '../ThemeProvider';
import { responsiveStoriesClassNames } from './Responsive.stories.css';

const meta = {
  component: Paper,
} satisfies Meta<typeof Paper>;

type IStory = StoryObj<typeof meta>;

const defaultArgs = {
  w: '$8',
  h: '$8',
  shape: '$xs',
  className: responsiveStoriesClassNames.root,
} satisfies Partial<IPaperProps>;

const ResponsivePaperShowcase = componentShowcaseFactory(Paper);

export const ContainerQueries: IStory = {
  render: (props) => (
    <ResponsivePaperShowcase
      props={props}
      cols={windowSizeClassNames.map((windowSizeClassName) => ({
        legend: capitalizeFirstLetter(windowSizeClassName),
        props: {
          className: clsx(
            responsiveStoriesClassNames.root,
            responsiveStoriesClassNames[`root$eq$${windowSizeClassName}`],
          ),
        },
      }))}
    />
  ),
  args: defaultArgs,
};

export default meta;
