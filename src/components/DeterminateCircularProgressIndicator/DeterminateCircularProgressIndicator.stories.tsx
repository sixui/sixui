import type { Meta, StoryObj } from '@storybook/react';

import type { IComponentPresentation } from '../ComponentShowcase';
import type { IDeterminateCircularProgressIndicatorProps } from './DeterminateCircularProgressIndicator.types';
import { componentShowcaseFactory } from '../ComponentShowcase';
import { DeterminateCircularProgressIndicator } from './DeterminateCircularProgressIndicator';

// https://m3.material.io/components/progress-indicators/overview
// https://material-web.dev/components/progress/
// https://github.com/material-components/material-web/blob/main/progress/demo/stories.ts

const meta = {
  component: DeterminateCircularProgressIndicator,
} satisfies Meta<typeof DeterminateCircularProgressIndicator>;

type IStory = StoryObj<typeof meta>;

const defaultArgs = {
  value: 0.75,
} satisfies Partial<IDeterminateCircularProgressIndicatorProps>;

const rows: Array<
  IComponentPresentation<IDeterminateCircularProgressIndicatorProps>
> = [{ legend: 'Normal' }, { legend: 'Disabled', props: { disabled: true } }];

const DeterminateCircularProgressIndicatorShowcase = componentShowcaseFactory(
  DeterminateCircularProgressIndicator,
);

export const Basic: IStory = {
  render: (props) => (
    <DeterminateCircularProgressIndicatorShowcase
      props={props}
      cols={[
        { props: { value: 0 } },
        { props: { value: 0.25 } },
        { props: { value: 0.5 } },
        { props: { value: 0.75 } },
        { props: { value: 1 } },
      ]}
      rows={rows}
    />
  ),
  args: defaultArgs,
};

export const Scales: IStory = {
  render: (props) => (
    <DeterminateCircularProgressIndicatorShowcase
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
    <DeterminateCircularProgressIndicatorShowcase
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

export const WithLabel: IStory = {
  render: (props) => (
    <DeterminateCircularProgressIndicatorShowcase
      props={props}
      cols={[
        { props: { value: 0 } },
        { props: { value: 0.25 } },
        { props: { value: 0.5 } },
        { props: { value: 0.75 } },
        { props: { value: 1 } },
      ]}
      rows={rows}
    />
  ),
  args: {
    ...defaultArgs,
    fz: '2.5rem',
    withLabel: true,
  },
};

export const WithLabelFormatter: IStory = {
  render: (props) => (
    <DeterminateCircularProgressIndicatorShowcase
      props={props}
      cols={[
        { props: { value: 0 } },
        { props: { value: 0.25 } },
        { props: { value: 0.5 } },
        { props: { value: 0.75 } },
        { props: { value: 1 } },
      ]}
      rows={rows}
    />
  ),
  args: {
    ...defaultArgs,
    fz: '2.5rem',
    withLabel: true,
    labelFormatter: (value) => `[${Math.round(value * 100)}]`,
  },
};

export const WithRange: IStory = {
  render: (props) => (
    <DeterminateCircularProgressIndicatorShowcase
      props={props}
      cols={[
        { props: { value: -64 } },
        { props: { value: -16 } },
        { props: { value: 32 } },
        { props: { value: 80 } },
        { props: { value: 128 } },
      ]}
      rows={rows}
    />
  ),
  args: {
    ...defaultArgs,
    fz: '2.5rem',
    withLabel: true,
    labelFormatter: (value) => `${value}`,
    min: -64,
    max: 128,
  },
};

export const ZeroBased: IStory = {
  render: (props) => (
    <DeterminateCircularProgressIndicatorShowcase
      props={props}
      cols={[
        { props: { value: -100 } },
        { props: { value: -67 } },
        { props: { value: -33 } },
        { props: { value: 0 } },
        { props: { value: 33 } },
        { props: { value: 67 } },
        { props: { value: 100 } },
      ]}
      rows={rows}
    />
  ),
  args: {
    ...defaultArgs,
    fz: '2.5rem',
    withLabel: true,
    labelFormatter: (value) => `${value}`,
    min: -100,
    max: 100,
    zeroBased: true,
  },
};

export default meta;
