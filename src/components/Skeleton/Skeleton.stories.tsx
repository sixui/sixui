import type { Meta, StoryObj } from '@storybook/react';

import type { IComponentPresentation } from '../ComponentShowcase';
import type { ISkeletonProps } from './Skeleton.types';
import { componentShowcaseFactory } from '../ComponentShowcase';
import { Skeleton } from './Skeleton';

const meta = {
  component: Skeleton,
} satisfies Meta<typeof Skeleton>;

type IStory = StoryObj<typeof meta>;

const defaultArgs = {
  children: 'Skeleton',
} satisfies Partial<ISkeletonProps>;

const variants: Array<IComponentPresentation<ISkeletonProps>> = [
  { legend: 'None', props: { variant: false } },
  { legend: 'Primary', props: { variant: 'primary' } },
];

const states: Array<IComponentPresentation<ISkeletonProps>> = [
  { legend: 'Normal' },
  { legend: 'Disabled', props: { disabled: true } },
];

const SkeletonShowcase = componentShowcaseFactory(Skeleton);

export const Basic: IStory = {
  render: (props) => (
    <SkeletonShowcase props={props} cols={states} rows={variants} />
  ),
  args: defaultArgs,
};

export default meta;
