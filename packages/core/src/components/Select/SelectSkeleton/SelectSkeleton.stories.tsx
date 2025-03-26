import type { Meta, StoryObj } from '@storybook/react';

import type { IComponentPresentation } from '~/components/ComponentShowcase';
import type { ISelectSkeletonProps } from './SelectSkeleton.types';
import { componentShowcaseFactory } from '~/components/ComponentShowcase';
import { px } from '~/utils/css';
import { SelectSkeleton } from './SelectSkeleton';

const meta = {
  component: SelectSkeleton,
  args: {
    w: px(384),
  },
} satisfies Meta<typeof SelectSkeleton>;

type IStory = StoryObj<typeof meta>;

const variants: Array<IComponentPresentation<ISelectSkeletonProps>> = [
  { legend: 'None', props: { variant: false } },
];

const states: Array<IComponentPresentation<ISelectSkeletonProps>> = [
  { legend: 'Normal' },
  { legend: 'Disabled', props: { disabled: true } },
];

const SelectSkeletonShowcase = componentShowcaseFactory(SelectSkeleton);

export const Basic: IStory = {
  render: (props) => (
    <SelectSkeletonShowcase props={props} cols={states} rows={variants} />
  ),
};

export default meta;
