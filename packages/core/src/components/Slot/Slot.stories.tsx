import type { Meta, StoryObj } from '@storybook/react';

import type { IComponentPresentation } from '~/components/ComponentShowcase';
import type { ISlotProps } from './Slot.types';
import { componentShowcaseFactory } from '~/components/ComponentShowcase';
import { Slot } from './Slot';

const meta = {
  component: Slot,
} satisfies Meta<typeof Slot>;

type IStory = StoryObj<typeof meta>;

const defaultArgs = {
  children: 'Slot',
} satisfies Partial<ISlotProps>;

const variants: Array<IComponentPresentation<ISlotProps>> = [
  { legend: 'None', props: { variant: false } },
  { legend: 'Primary', props: { variant: 'primary' } },
];

const states: Array<IComponentPresentation<ISlotProps>> = [
  { legend: 'Normal' },
  { legend: 'Disabled', props: { disabled: true } },
];

const SlotShowcase = componentShowcaseFactory(Slot);

export const Basic: IStory = {
  render: (props) => (
    <SlotShowcase props={props} cols={states} rows={variants} />
  ),
  args: defaultArgs,
};

export default meta;
