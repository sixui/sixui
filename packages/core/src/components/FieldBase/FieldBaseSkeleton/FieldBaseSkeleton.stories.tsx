import type { Meta, StoryObj } from '@storybook/react';

import type { IComponentPresentation } from '~/components/ComponentShowcase';
import type { IFieldBaseSkeletonProps } from './FieldBaseSkeleton.types';
import { componentShowcaseFactory } from '~/components/ComponentShowcase';
import { px } from '~/utils/css';
import { FieldBaseSkeleton } from './FieldBaseSkeleton';

const meta = {
  component: FieldBaseSkeleton,
  args: {
    w: px(240),
  },
} satisfies Meta<typeof FieldBaseSkeleton>;

type IStory = StoryObj<typeof meta>;

const variants: Array<IComponentPresentation<IFieldBaseSkeletonProps>> = [
  { legend: 'None', props: { variant: false } },
];

const states: Array<IComponentPresentation<IFieldBaseSkeletonProps>> = [
  { legend: 'Normal' },
  { legend: 'Disabled', props: { disabled: true } },
];

const FieldBaseSkeletonShowcase = componentShowcaseFactory(FieldBaseSkeleton);

export const Basic: IStory = {
  render: (props) => (
    <FieldBaseSkeletonShowcase props={props} cols={states} rows={variants} />
  ),
};

export default meta;
