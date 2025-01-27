import type { Meta, StoryObj } from '@storybook/react';

import type { IComponentPresentation } from '~/components/ComponentShowcase';
import type { IIndeterminateCircularProgressIndicatorProps } from './IndeterminateCircularProgressIndicator.types';
import { componentShowcaseFactory } from '~/components/ComponentShowcase';
import { IndeterminateCircularProgressIndicator } from './IndeterminateCircularProgressIndicator';

// https://m3.material.io/components/progress-indicators/overview
// https://material-web.dev/components/progress/
// https://github.com/material-components/material-web/blob/main/progress/demo/stories.ts

const meta = {
  component: IndeterminateCircularProgressIndicator,
} satisfies Meta<typeof IndeterminateCircularProgressIndicator>;

type IStory = StoryObj<typeof meta>;

const defaultArgs =
  {} satisfies Partial<IIndeterminateCircularProgressIndicatorProps>;

const rows: Array<
  IComponentPresentation<IIndeterminateCircularProgressIndicatorProps>
> = [{ legend: 'Normal' }, { legend: 'Disabled', props: { disabled: true } }];

const IndeterminateCircularProgressIndicatorShowcase = componentShowcaseFactory(
  IndeterminateCircularProgressIndicator,
);

export const Basic: IStory = {
  render: (props) => (
    <IndeterminateCircularProgressIndicatorShowcase props={props} rows={rows} />
  ),
  args: defaultArgs,
};

export const Scales: IStory = {
  render: (props) => (
    <IndeterminateCircularProgressIndicatorShowcase
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
    <IndeterminateCircularProgressIndicatorShowcase
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
