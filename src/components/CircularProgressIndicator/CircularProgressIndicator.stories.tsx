import type { Meta, StoryObj } from '@storybook/react';

import type { ICircularProgressIndicatorProps } from './CircularProgressIndicator.types';
import {
  makeComponentShowcase,
  type IComponentPresentation,
} from '../ComponentShowcase';
import { CircularProgressIndicator } from './CircularProgressIndicator';
import { Text } from '../Text';

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

const CircularProgressIndicatorShowcase = makeComponentShowcase(
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

const CircularProgressIndicatorWithTextShowcase = makeComponentShowcase(
  (props: ICircularProgressIndicatorProps) => (
    <Text as='div'>
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

export default meta;
