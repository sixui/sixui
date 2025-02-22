import type { Meta, StoryObj } from '@storybook/react';

import type { IComponentPresentation } from '~/components/ComponentShowcase';
import type { IPaperProps } from './Paper.types';
import { componentShowcaseFactory } from '~/components/ComponentShowcase';
import { Paper } from './Paper';

const meta: Meta<typeof Paper> = {
  component: Paper,
};

type IStory = StoryObj<IPaperProps>;

const defaultArgs = {
  w: '$24',
  h: '$24',
} satisfies Partial<IPaperProps>;

const states: Array<IComponentPresentation<IPaperProps>> = [
  { legend: 'Enabled' },
  { legend: 'Disabled', props: { disabled: true } },
];

const PaperDemo: React.FC<IPaperProps> = (props) => <Paper {...props} />;

const PaperShowcase = componentShowcaseFactory(PaperDemo);

export const Elevation: IStory = {
  render: (props) => (
    <PaperShowcase
      props={props}
      cols={states}
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
  },
};

export const Surface: IStory = {
  render: (props) => (
    <PaperShowcase
      props={props}
      cols={states}
      rows={(
        [
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
        ] as Array<IPaperProps['surface']>
      ).map((surface) => ({
        legend: `Surface (${String(surface)})`,
        props: {
          surface,
        },
      }))}
    />
  ),
  args: defaultArgs,
};

export const Shape: IStory = {
  render: (props) => (
    <PaperShowcase
      props={props}
      cols={states}
      rows={(
        [
          '$none',
          '$xs',
          '$sm',
          '$md',
          '$lg',
          '$xl',
          '$full',
          '$circle',
        ] as Array<IPaperProps['shape']>
      ).map((shape) => ({
        legend: `Shape (${shape})`,
        props: {
          shape,
        },
      }))}
    />
  ),
  args: {
    ...defaultArgs,
    surface: '$surfaceContainer',
  },
};

export const Outline: IStory = {
  render: (props) => (
    <PaperShowcase
      props={props}
      cols={states}
      rows={(
        ['$none', '$xs', '$sm', '$md', '$lg', '$xl'] as Array<
          IPaperProps['outline']
        >
      ).map((outline) => ({
        legend: `Outline (${outline})`,
        props: {
          outline,
        },
      }))}
    />
  ),
  args: {
    ...defaultArgs,
    surface: '$surfaceContainer',
  },
};

export default meta;
