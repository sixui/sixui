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
} satisfies Partial<IPaperProps>;

const PaperDemo: React.FC<IPaperProps> = ({ children, ...props }) => (
  <Paper {...props} corner="$md">
    <div className={classNames.inner}>{children}</div>
  </Paper>
);

const PaperShowcase = makeComponentShowcase(PaperDemo);

export const Elevations: IStory = {
  render: (props) => (
    <PaperShowcase
      props={props}
      rows={(
        ['$0', '$1', '$2', '$3', '$4', '$5'] as Array<IPaperProps['elevation']>
      ).map((elevation) => ({
        legend: `Level (${elevation})`,
        props: {
          elevation,
        },
      }))}
    />
  ),
  args: {
    ...defaultArgs,
    surface: '$surfaceContainer',
    corner: '$md',
  },
};

const surfaces: Array<IPaperProps['surface']> = [
  '$surfaceContainerLowest',
  '$surfaceContainerLow',
  '$surfaceContainer',
  '$surfaceContainerHigh',
  '$surfaceContainerHighest',
  '$inverseSurface',
  '$primaryContainer',
  '$secondaryContainer',
  '$tertiaryContainer',
  '$errorContainer',
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
    corner: '$md',
  },
};

export default meta;
