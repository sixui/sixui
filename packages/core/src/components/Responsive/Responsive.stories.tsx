import type { Meta, StoryObj } from '@storybook/react';
import { capitalizeFirstLetter } from '@olivierpascal/helpers';
import cx from 'clsx';

import type { IPaperProps } from '~/components/Paper';
import { componentShowcaseFactory } from '~/components/ComponentShowcase';
import { Paper } from '~/components/Paper';
import { windowSizeClassNames } from '~/components/Theme';
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
          className: cx(
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
