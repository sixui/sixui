import type { Meta, StoryObj } from '@storybook/react';

import type { IComponentPresentation } from '~/components/ComponentShowcase';
import type { ICheckmarkProps } from './Checkmark.types';
import { componentShowcaseFactory } from '~/components/ComponentShowcase';
import { Checkmark } from './Checkmark';

const meta = {
  component: Checkmark,
} satisfies Meta<typeof Checkmark>;

type IStory = StoryObj<typeof meta>;

const defaultArgs = {
  w: '$12',
  h: '$12',
  c: '$primary',
} satisfies Partial<ICheckmarkProps>;

const cols: Array<IComponentPresentation<ICheckmarkProps>> = [
  { legend: 'Default' },
  { legend: 'Indeterminate', props: { indeterminate: true } },
  { legend: 'Checked', props: { checked: true } },
];

const CheckmarkShowcase = componentShowcaseFactory(Checkmark);

export const Basic: IStory = {
  render: (props) => <CheckmarkShowcase props={props} cols={cols} />,
  args: defaultArgs,
};

export default meta;
