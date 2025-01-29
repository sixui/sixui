import type { Meta, StoryObj } from '@storybook/react';

import type { IComponentPresentation } from '~/components/ComponentShowcase';
import type { IAnimatedSlotProps } from './AnimatedSlot.types';
import { componentShowcaseFactory } from '~/components/ComponentShowcase';
import { AnimatedSlot } from './AnimatedSlot';

const meta = {
  component: AnimatedSlot,
} satisfies Meta<typeof AnimatedSlot>;

type IStory = StoryObj<typeof meta>;

const defaultArgs = {
  children: 'AnimatedSlot',
} satisfies Partial<IAnimatedSlotProps>;

const variants: Array<IComponentPresentation<IAnimatedSlotProps>> = [
  { legend: 'None', props: { variant: false } },
  { legend: 'Primary', props: { variant: 'primary' } },
];

const states: Array<IComponentPresentation<IAnimatedSlotProps>> = [
  { legend: 'Normal' },
  { legend: 'Disabled', props: { disabled: true } },
];

const AnimatedSlotShowcase = componentShowcaseFactory(AnimatedSlot);

export const Basic: IStory = {
  render: (props) => (
    <AnimatedSlotShowcase props={props} cols={states} rows={variants} />
  ),
  args: defaultArgs,
};

export default meta;
