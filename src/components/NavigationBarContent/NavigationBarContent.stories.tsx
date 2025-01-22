import type { Meta, StoryObj } from '@storybook/react';

import type { IComponentPresentation } from '../ComponentShowcase';
import type { INavigationBarContentProps } from './NavigationBarContent.types';
import { componentShowcaseFactory } from '../ComponentShowcase';
import { NavigationBarContent } from './NavigationBarContent';

const meta = {
  component: NavigationBarContent,
} satisfies Meta<typeof NavigationBarContent>;

type IStory = StoryObj<typeof meta>;

const defaultArgs = {
  children: 'NavigationBarContent',
} satisfies Partial<INavigationBarContentProps>;

const variants: Array<IComponentPresentation<INavigationBarContentProps>> = [
  { legend: 'None', props: { variant: false } },
  { legend: 'Primary', props: { variant: 'primary' } },
];

const states: Array<IComponentPresentation<INavigationBarContentProps>> = [
  { legend: 'Normal' },
  { legend: 'Disabled', props: { disabled: true } },
];

const NavigationBarContentShowcase =
  componentShowcaseFactory(NavigationBarContent);

export const Basic: IStory = {
  render: (props) => (
    <NavigationBarContentShowcase props={props} cols={states} rows={variants} />
  ),
  args: defaultArgs,
};

export default meta;
