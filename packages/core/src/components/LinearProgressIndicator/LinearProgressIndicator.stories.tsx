import type { Meta, StoryObj } from '@storybook/react';

import type { IComponentPresentation } from '~/components/ComponentShowcase';
import type { ILinearProgressIndicatorProps } from './LinearProgressIndicator.types';
import { componentShowcaseFactory } from '~/components/ComponentShowcase';
import { Flex } from '~/components/Flex';
import { LinearProgressIndicator } from './LinearProgressIndicator';

const meta = {
  component: LinearProgressIndicator,
} satisfies Meta<typeof LinearProgressIndicator>;

type IStory = StoryObj<typeof meta>;

const defaultArgs = {
  w: '$72',
} satisfies Partial<ILinearProgressIndicatorProps>;

const rows: Array<IComponentPresentation<ILinearProgressIndicatorProps>> = [
  { legend: 'Normal' },
  { legend: 'Disabled', props: { disabled: true } },
];

const LinearProgressIndicatorShowcase = componentShowcaseFactory(
  LinearProgressIndicator,
);

export const Variants: IStory = {
  render: (props) => (
    <LinearProgressIndicatorShowcase
      props={props}
      cols={[{ props: { value: undefined } }, { props: { value: 0.75 } }]}
      rows={rows}
    />
  ),
  args: defaultArgs,
};

const LinearProgressIndicatorWithTextShowcase = componentShowcaseFactory(
  (props: ILinearProgressIndicatorProps) => (
    <Flex gap="$2">
      <LinearProgressIndicator {...props} />{' '}
      <LinearProgressIndicator {...props} value={0.75} />
    </Flex>
  ),
);

export const Scales: IStory = {
  render: (props) => (
    <LinearProgressIndicatorWithTextShowcase
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
    <LinearProgressIndicatorWithTextShowcase
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
