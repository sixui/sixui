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
  { legend: 'Enabled' },
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

const CircularProgressIndicatorShowcase2 = makeComponentShowcase(
  ({ fz, ...other }: ICircularProgressIndicatorProps) => (
    <Text fz={fz}>
      {fz} <CircularProgressIndicator {...other} />
    </Text>
  ),
);

export const Sizes: IStory = {
  render: (props) => (
    <CircularProgressIndicatorShowcase2
      props={props}
      rows={[
        { props: { fz: '1em' } },
        { props: { fz: '2em' } },
        { props: { fz: '3em' } },
        { props: { fz: '4em' } },
      ]}
    />
  ),
  args: defaultArgs,
};

export default meta;
