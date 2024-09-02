import type { Meta, StoryObj } from '@storybook/react';

import type { IPaperProps } from './Paper.types';
import { makeComponentShowcase } from '../ComponentShowcase';
import { Paper } from './Paper';
import { paperStoriesStyles } from './Paper.stories.css';

// https://material.io/blog/tone-based-surface-color-m3
// https://m3.material.io/styles/elevation/overview

const { classNames } = paperStoriesStyles;

const meta: Meta<typeof Paper> = {
  component: Paper,
};

type IStory = StoryObj<IPaperProps>;

const defaultArgs = {
  className: classNames.root,
  cornerTopLeft: '$lg',
} satisfies Partial<IPaperProps>;

const PaperDemo: React.FC<IPaperProps> = ({ children, ...props }) => (
  <Paper {...props}>
    <div className={classNames.inner}>{children}</div>
  </Paper>
);

const corners: Array<IPaperProps['corner']> = [
  undefined,
  'xs',
  'sm',
  'md',
  'lg',
  'xl',
  'full',
];

const PaperShowcase = makeComponentShowcase(PaperDemo);

export const Corners: IStory = {
  render: (props) => (
    <PaperShowcase
      props={props}
      rows={corners.map((corner) => ({
        legend: `Corner (${(corner as string) ?? 'none'})`,
        props: {
          outlined: true,
          corner,
        },
      }))}
    />
  ),
  args: defaultArgs,
};

export const Elevations: IStory = {
  render: (props) => (
    <PaperShowcase
      props={props}
      rows={([undefined, 1, 2, 3, 4, 5] as Array<IPaperProps['elevation']>).map(
        (elevation) => ({
          legend: `Level (${elevation})`,
          props: {
            elevation,
          },
        }),
      )}
    />
  ),
  args: {
    ...defaultArgs,
    corner: 'md',
  },
};

const surfaces: Array<IPaperProps['surface']> = [
  undefined,
  'surfaceContainerLowest',
  'surfaceContainerLow',
  'surfaceContainer',
  'surfaceContainerHigh',
  'surfaceContainerHighest',
  'inverseSurface',
  'primaryContainer',
  'secondaryContainer',
  'tertiaryContainer',
  'errorContainer',
];

export const Surface: IStory = {
  render: (props) => (
    <PaperShowcase
      props={props}
      rows={surfaces.map((surface) => ({
        legend: `Surface (${String(surface)})`,
        props: {
          surface,
        },
      }))}
    />
  ),
  args: {
    ...defaultArgs,
    corner: 'md',
  },
};

export default meta;
