import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';

import { ComponentShowcase } from '@/components/molecules/ComponentShowcase';
import {
  DeterminateCircularProgressIndicator,
  type IDeterminateCircularProgressIndicatorProps,
} from './DeterminateCircularProgressIndicator';
import { circularProgressIndicatorSizes } from './CircularProgressIndicator.styledefs';

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

export const Standard: IStory = {
  render: (props) => (
    <ComponentShowcase
      component={DeterminateCircularProgressIndicator}
      props={props}
      colsProps={[
        { value: 0 },
        { value: 0.25 },
        { value: 0.5 },
        { value: 0.75 },
        { value: 1 },
      ]}
      rowsProps={[{}, { disabled: true }]}
    />
  ),
  args: defaultArgs,
};

export const WithLabel: IStory = {
  render: (props) => (
    <ComponentShowcase
      component={DeterminateCircularProgressIndicator}
      props={props}
      colsProps={[
        { value: 0 },
        { value: 0.25 },
        { value: 0.5 },
        { value: 0.75 },
        { value: 1 },
      ]}
      rowsProps={[{}, { disabled: true }]}
    />
  ),
  args: {
    ...defaultArgs,
    size: 'lg',
    withLabel: true,
  },
};

export const WithLabelFormatter: IStory = {
  render: (props) => (
    <ComponentShowcase
      component={DeterminateCircularProgressIndicator}
      props={props}
      colsProps={[
        { value: 0 },
        { value: 0.25 },
        { value: 0.5 },
        { value: 0.75 },
        { value: 1 },
      ]}
      rowsProps={[{}, { disabled: true }]}
    />
  ),
  args: {
    ...defaultArgs,
    size: 'lg',
    withLabel: true,
    labelFormatter: (value) => `[${Math.round(value * 100)}]`,
  },
};

export const WithRange: IStory = {
  render: (props) => (
    <ComponentShowcase
      component={DeterminateCircularProgressIndicator}
      props={props}
      colsProps={[
        { value: -64 },
        { value: -16 },
        { value: 32 },
        { value: 80 },
        { value: 128 },
      ]}
      rowsProps={[{}, { disabled: true }]}
    />
  ),
  args: {
    ...defaultArgs,
    size: 'lg',
    withLabel: true,
    labelFormatter: (value) => `${value}`,
    min: -64,
    max: 128,
  },
};

export const ZeroBased: IStory = {
  render: (props) => (
    <ComponentShowcase
      component={DeterminateCircularProgressIndicator}
      props={props}
      colsProps={[
        { value: -100 },
        { value: -50 },
        { value: 0 },
        { value: 50 },
        { value: 100 },
      ]}
      rowsProps={[{}, { disabled: true }]}
    />
  ),
  args: {
    ...defaultArgs,
    size: 'lg',
    withLabel: true,
    labelFormatter: (value) => `${value}`,
    min: -100,
    max: 100,
    zeroBased: true,
  },
};

export const Sizes: IStory = {
  render: (props) => (
    <ComponentShowcase
      component={DeterminateCircularProgressIndicator}
      props={props}
      colsProps={circularProgressIndicatorSizes.map((size) => ({ size }))}
    />
  ),
  args: defaultArgs,
};

export default meta;
