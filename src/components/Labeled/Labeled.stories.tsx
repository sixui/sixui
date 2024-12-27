import type { Meta, StoryObj } from '@storybook/react';

import type { IComponentPresentation } from '../ComponentShowcase';
import type { ILabeledProps } from './Labeled.types';
import { componentShowcaseFactory } from '../ComponentShowcase';
import { Labeled } from './Labeled';

const meta = {
  component: Labeled,
} satisfies Meta<typeof Labeled>;

type IStory = StoryObj<typeof meta>;

const defaultArgs = {
  children: 'Labeled',
} satisfies Partial<ILabeledProps>;

const variants: Array<IComponentPresentation<ILabeledProps>> = [
  { legend: 'None', props: { variant: false } },
  { legend: 'Primary', props: { variant: 'primary' } },
];

const states: Array<IComponentPresentation<ILabeledProps>> = [
  { legend: 'Normal' },
  { legend: 'Disabled', props: { disabled: true } },
];

const LabeledShowcase = componentShowcaseFactory(Labeled);

export const Basic: IStory = {
  render: (props) => (
    <LabeledShowcase props={props} cols={states} rows={variants} />
  ),
  args: defaultArgs,
};

export default meta;
