import type { Meta, StoryObj } from '@storybook/react';

import type { IComponentPresentation } from '~/components/ComponentShowcase';
import type { ICircularProgressIndicatorProps } from './CircularProgressIndicator.types';
import { componentShowcaseFactory } from '~/components/ComponentShowcase';
import { Text } from '~/components/Text';
import { CircularProgressIndicator } from './CircularProgressIndicator';

// https://m3.material.io/components/progress-indicators/overview
// https://material-web.dev/components/progress/
// https://github.com/material-components/material-web/blob/main/progress/demo/stories.ts

const meta = {
  component: CircularProgressIndicator,
} satisfies Meta<typeof CircularProgressIndicator>;

type IStory = StoryObj<typeof meta>;

const defaultArgs = {} satisfies Partial<ICircularProgressIndicatorProps>;

const rows: Array<IComponentPresentation<ICircularProgressIndicatorProps>> = [
  { legend: 'Normal' },
  { legend: 'Disabled', props: { disabled: true } },
];

const CircularProgressIndicatorShowcase = componentShowcaseFactory(
  CircularProgressIndicator,
);

export const Variants: IStory = {
  render: (props) => (
    <CircularProgressIndicatorShowcase
      props={props}
      cols={[{ props: { value: undefined } }, { props: { value: 0.75 } }]}
      rows={rows}
    />
  ),
  args: defaultArgs,
};

const CircularProgressIndicatorWithTextShowcase = componentShowcaseFactory(
  (props: ICircularProgressIndicatorProps) => (
    <Text as="div">
      <CircularProgressIndicator {...props} />{' '}
      <CircularProgressIndicator {...props} value={0.75} />
    </Text>
  ),
);

export const Scales: IStory = {
  render: (props) => (
    <CircularProgressIndicatorWithTextShowcase
      props={props}
      cols={[
        { legend: 'Extra small', props: { scale: 'xs' } },
        { legend: 'Small', props: { scale: 'sm' } },
        { legend: 'Medium', props: { scale: 'md' } },
        { legend: 'Large', props: { scale: 'lg' } },
        { legend: 'Extra large', props: { scale: 'xl' } },
      ]}
    />
  ),
  args: defaultArgs,
};

export const FontSizes: IStory = {
  render: (props) => (
    <CircularProgressIndicatorWithTextShowcase
      props={props}
      cols={[
        { legend: '2', props: { fz: '$2' } },
        { legend: '4', props: { fz: '$4' } },
        { legend: '8', props: { fz: '$8' } },
        { legend: '16', props: { fz: '$16' } },
        { legend: '32', props: { fz: '$32' } },
      ]}
    />
  ),
  args: defaultArgs,
};

export default meta;
