import type { Meta, StoryObj } from '@storybook/react';

import type { IComponentPresentation } from '../ComponentShowcase';
import type { INavigationDrawerDestinationProps } from './NavigationDrawerDestination.types';
import { componentShowcaseFactory } from '../ComponentShowcase';
import { NavigationDrawerDestination } from './NavigationDrawerDestination';

const meta = {
  component: NavigationDrawerDestination,
} satisfies Meta<typeof NavigationDrawerDestination>;

type IStory = StoryObj<typeof meta>;

const defaultArgs = {
  children: 'NavigationDrawerDestination',
} satisfies Partial<INavigationDrawerDestinationProps>;

const variants: Array<
  IComponentPresentation<INavigationDrawerDestinationProps>
> = [
  { legend: 'None', props: { variant: false } },
  { legend: 'Primary', props: { variant: 'primary' } },
];

const states: Array<IComponentPresentation<INavigationDrawerDestinationProps>> =
  [{ legend: 'Normal' }, { legend: 'Disabled', props: { disabled: true } }];

const NavigationDrawerDestinationShowcase = componentShowcaseFactory(
  NavigationDrawerDestination,
);

export const Basic: IStory = {
  render: (props) => (
    <NavigationDrawerDestinationShowcase
      props={props}
      cols={states}
      rows={variants}
    />
  ),
  args: defaultArgs,
};

export default meta;
