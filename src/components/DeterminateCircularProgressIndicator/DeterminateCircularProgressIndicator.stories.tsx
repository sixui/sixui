import type { Meta, StoryObj } from '@storybook/react';
import stylex from '@stylexjs/stylex';

import type { IDeterminateCircularProgressIndicatorProps } from './DeterminateCircularProgressIndicator.types';
import { ComponentShowcase } from '../ComponentShowcase';
import { Typography } from '../Typography';
import { DeterminateCircularProgressIndicator } from './DeterminateCircularProgressIndicator';

// https://m3.material.io/components/progress-indicators/overview
// https://material-web.dev/components/progress/
// https://github.com/material-components/material-web/blob/main/progress/demo/stories.ts

const meta = {
  component: DeterminateCircularProgressIndicator,
} satisfies Meta<typeof DeterminateCircularProgressIndicator>;

type IStory = StoryObj<typeof meta>;

const styles = stylex.create({
  host$withLabel: {
    width: 48,
    height: 48,
  },
});

const defaultArgs = {
  value: 0.75,
} satisfies Partial<IDeterminateCircularProgressIndicatorProps>;

export const Basic: IStory = {
  render: (props) => (
    <ComponentShowcase
      component={DeterminateCircularProgressIndicator}
      props={props}
      cols={[
        { props: { value: 0 } },
        { props: { value: 0.25 } },
        { props: { value: 0.5 } },
        { props: { value: 0.75 } },
        { props: { value: 1 } },
      ]}
      rows={[{}, { props: { disabled: true } }]}
    />
  ),
  args: defaultArgs,
};

export const WithLabel: IStory = {
  render: (props) => (
    <ComponentShowcase
      component={(props) => (
        <Typography>
          <DeterminateCircularProgressIndicator {...props} />
        </Typography>
      )}
      props={props}
      cols={[
        { props: { value: 0 } },
        { props: { value: 0.25 } },
        { props: { value: 0.5 } },
        { props: { value: 0.75 } },
        { props: { value: 1 } },
      ]}
      rows={[{}, { props: { disabled: true } }]}
    />
  ),
  args: {
    ...defaultArgs,
    withLabel: true,
    sx: styles.host$withLabel,
  },
};

export const WithLabelFormatter: IStory = {
  render: (props) => (
    <ComponentShowcase
      component={(props) => (
        <Typography>
          <DeterminateCircularProgressIndicator {...props} />
        </Typography>
      )}
      props={props}
      cols={[
        { props: { value: 0 } },
        { props: { value: 0.25 } },
        { props: { value: 0.5 } },
        { props: { value: 0.75 } },
        { props: { value: 1 } },
      ]}
      rows={[{}, { props: { disabled: true } }]}
    />
  ),
  args: {
    ...defaultArgs,
    withLabel: true,
    sx: styles.host$withLabel,
    labelFormatter: (value) => `[${Math.round(value * 100)}]`,
  },
};

export const WithRange: IStory = {
  render: (props) => (
    <ComponentShowcase
      component={(props) => (
        <Typography>
          <DeterminateCircularProgressIndicator {...props} />
        </Typography>
      )}
      props={props}
      cols={[
        { props: { value: -64 } },
        { props: { value: -16 } },
        { props: { value: 32 } },
        { props: { value: 80 } },
        { props: { value: 128 } },
      ]}
      rows={[{}, { props: { disabled: true } }]}
    />
  ),
  args: {
    ...defaultArgs,
    withLabel: true,
    sx: styles.host$withLabel,
    labelFormatter: (value) => `${value}`,
    min: -64,
    max: 128,
  },
};

export const ZeroBased: IStory = {
  render: (props) => (
    <ComponentShowcase
      component={(props) => (
        <Typography>
          <DeterminateCircularProgressIndicator {...props} />
        </Typography>
      )}
      props={props}
      cols={[
        { props: { value: -100 } },
        { props: { value: -50 } },
        { props: { value: 0 } },
        { props: { value: 50 } },
        { props: { value: 100 } },
      ]}
      rows={[{}, { props: { disabled: true } }]}
    />
  ),
  args: {
    ...defaultArgs,
    withLabel: true,
    sx: styles.host$withLabel,
    labelFormatter: (value) => `${value}`,
    min: -100,
    max: 100,
    zeroBased: true,
  },
};

export default meta;
