import type { Meta, StoryObj } from '@storybook/react';

import type { IComponentPresentation } from '~/components/ComponentShowcase';
import type { ILinearProgressIndicatorProps } from './LinearProgressIndicator.types';
import { componentShowcaseFactory } from '~/components/ComponentShowcase';
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
      horizontalAlign="start"
      verticalAlign="center"
      props={props}
      cols={[{ props: { value: undefined } }, { props: { value: 0.75 } }]}
      rows={rows}
    />
  ),
  args: defaultArgs,
};

export const Scales: IStory = {
  render: (props) => (
    <LinearProgressIndicatorShowcase
      horizontalAlign="start"
      verticalAlign="center"
      props={props}
      rows={[
        { legend: 'Extra small', props: { scale: 'xs' } },
        { legend: 'Small', props: { scale: 'sm' } },
        { legend: 'Medium', props: { scale: 'md' } },
        { legend: 'Large', props: { scale: 'lg' } },
        { legend: 'Extra large', props: { scale: 'xl' } },
      ]}
      cols={[{ props: { value: undefined } }, { props: { value: 0.75 } }]}
    />
  ),
  args: defaultArgs,
};

export default meta;
