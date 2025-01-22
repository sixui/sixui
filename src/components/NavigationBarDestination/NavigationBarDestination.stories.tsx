import type { Meta, StoryObj } from '@storybook/react';

import type { IComponentPresentation } from '../ComponentShowcase';
import type { INavigationBarDestinationProps } from './NavigationBarDestination.types';
import { componentShowcaseFactory } from '../ComponentShowcase';
import { NavigationBarDestination } from './NavigationBarDestination';

const meta = {
  component: NavigationBarDestination,
} satisfies Meta<typeof NavigationBarDestination>;

type IStory = StoryObj<typeof meta>;

const defaultArgs = {
  children: 'NavigationBarDestination',
} satisfies Partial<INavigationBarDestinationProps>;

const variants: Array<IComponentPresentation<INavigationBarDestinationProps>> =
  [
    { legend: 'None', props: { variant: false } },
    { legend: 'Primary', props: { variant: 'primary' } },
  ];

const states: Array<IComponentPresentation<INavigationBarDestinationProps>> = [
  { legend: 'Normal' },
  { legend: 'Disabled', props: { disabled: true } },
];

const NavigationBarDestinationShowcase = componentShowcaseFactory(
  NavigationBarDestination,
);

export const Basic: IStory = {
  render: (props) => (
    <NavigationBarDestinationShowcase
      props={props}
      cols={states}
      rows={variants}
    />
  ),
  args: defaultArgs,
};

export default meta;
