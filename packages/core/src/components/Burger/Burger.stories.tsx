import type { Meta, StoryObj } from '@storybook/react';

import type { IComponentPresentation } from '~/components/ComponentShowcase';
import type { IBurgerProps } from './Burger.types';
import { componentShowcaseFactory } from '~/components/ComponentShowcase';
import { Burger } from './Burger';

const meta = {
  component: Burger,
} satisfies Meta<typeof Burger>;

type IStory = StoryObj<typeof meta>;

const defaultArgs = {
  children: 'Burger',
} satisfies Partial<IBurgerProps>;

const variants: Array<IComponentPresentation<IBurgerProps>> = [
  { legend: 'None', props: { variant: false } },
  { legend: 'Primary', props: { variant: 'primary' } },
];

const states: Array<IComponentPresentation<IBurgerProps>> = [
  { legend: 'Normal' },
  { legend: 'Disabled', props: { disabled: true } },
];

const BurgerShowcase = componentShowcaseFactory(Burger);

export const Basic: IStory = {
  render: (props) => (
    <BurgerShowcase props={props} cols={states} rows={variants} />
  ),
  args: defaultArgs,
};

export default meta;
