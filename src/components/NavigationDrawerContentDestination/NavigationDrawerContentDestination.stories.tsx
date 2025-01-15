import type { Meta, StoryObj } from '@storybook/react';

import type { IComponentPresentation } from '../ComponentShowcase';
import type { INavigationDrawerContentDestinationProps } from './NavigationDrawerContentDestination.types';
import { componentShowcaseFactory } from '../ComponentShowcase';
import { NavigationDrawerContentDestination } from './NavigationDrawerContentDestination';

const meta = {
  component: NavigationDrawerContentDestination,
} satisfies Meta<typeof NavigationDrawerContentDestination>;

type IStory = StoryObj<typeof meta>;

const defaultArgs = {
  children: 'NavigationDrawerContentDestination',
} satisfies Partial<INavigationDrawerContentDestinationProps>;

const variants: Array<
  IComponentPresentation<INavigationDrawerContentDestinationProps>
> = [
  { legend: 'None', props: { variant: false } },
  { legend: 'Primary', props: { variant: 'primary' } },
];

const states: Array<
  IComponentPresentation<INavigationDrawerContentDestinationProps>
> = [{ legend: 'Normal' }, { legend: 'Disabled', props: { disabled: true } }];

const NavigationDrawerContentDestinationShowcase = componentShowcaseFactory(
  NavigationDrawerContentDestination,
);

export const Basic: IStory = {
  render: (props) => (
    <NavigationDrawerContentDestinationShowcase
      props={props}
      cols={states}
      rows={variants}
    />
  ),
  args: defaultArgs,
};

export default meta;
