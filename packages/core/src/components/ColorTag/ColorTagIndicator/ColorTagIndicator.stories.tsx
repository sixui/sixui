import type { Meta, StoryObj } from '@storybook/react-vite';

import type { IColorTagIndicatorProps } from './ColorTagIndicator.types';
import {
  componentShowcaseFactory,
  IComponentPresentation,
} from '~/components/ComponentShowcase';
import { ColorTagIndicator } from './ColorTagIndicator';

const meta = {
  component: ColorTagIndicator,
} satisfies Meta<typeof ColorTagIndicator>;

type IStory = StoryObj<typeof meta>;

const defaultArgs = {} satisfies Partial<IColorTagIndicatorProps>;

const ColorTagIndicatorShowcase = componentShowcaseFactory(ColorTagIndicator);

const cols: Array<IComponentPresentation<IColorTagIndicatorProps>> = [
  {
    legend: 'Normal',
  },
  {
    legend: 'Empty',
    props: {
      color: undefined,
    },
  },
  {
    legend: 'Invalid',
    props: {
      color: 'invalid',
    },
  },
];

const rows: Array<IComponentPresentation<IColorTagIndicatorProps>> = [
  { legend: 'Normal' },
  { legend: 'Outlined', props: { outlined: true } },
];

export const DarkColor: IStory = {
  render: (props) => (
    <ColorTagIndicatorShowcase props={props} cols={cols} rows={rows} />
  ),
  args: {
    ...defaultArgs,
    color: '#000000',
  },
};

export const LightColor: IStory = {
  render: (props) => (
    <ColorTagIndicatorShowcase props={props} cols={cols} rows={rows} />
  ),
  args: {
    ...defaultArgs,
    color: '#ffffff',
  },
};

export default meta;
