import type { Meta, StoryObj } from '@storybook/react';

import type { IComponentPresentation } from '../ComponentShowcase';
import type { IDisclosureProps } from './Disclosure.types';
import { componentShowcaseFactory } from '../ComponentShowcase';
import { Disclosure } from './Disclosure';

const meta = {
  component: Disclosure,
} satisfies Meta<typeof Disclosure>;

type IStory = StoryObj<typeof meta>;

const defaultArgs = {
  children: 'Disclosure',
} satisfies Partial<IDisclosureProps>;

const variants: Array<IComponentPresentation<IDisclosureProps>> = [
  { legend: 'None', props: { variant: false } },
  { legend: 'Primary', props: { variant: 'primary' } },
];

const states: Array<IComponentPresentation<IDisclosureProps>> = [
  { legend: 'Normal' },
  { legend: 'Disabled', props: { disabled: true } },
];

const DisclosureShowcase = componentShowcaseFactory(Disclosure);

export const Basic: IStory = {
  render: (props) => (
    <DisclosureShowcase props={props} cols={states} rows={variants} />
  ),
  args: defaultArgs,
};

export default meta;
