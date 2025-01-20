import type { Meta, StoryObj } from '@storybook/react';

import type { IComponentPresentation } from '../ComponentShowcase';
import type { IAppLayoutFooterProps } from './AppLayoutFooter.types';
import { componentShowcaseFactory } from '../ComponentShowcase';
import { AppLayoutFooter } from './AppLayoutFooter';

const meta = {
  component: AppLayoutFooter,
} satisfies Meta<typeof AppLayoutFooter>;

type IStory = StoryObj<typeof meta>;

const defaultArgs = {
  children: 'AppLayoutFooter',
} satisfies Partial<IAppLayoutFooterProps>;

const variants: Array<IComponentPresentation<IAppLayoutFooterProps>> = [
  { legend: 'None', props: { variant: false } },
  { legend: 'Primary', props: { variant: 'primary' } },
];

const states: Array<IComponentPresentation<IAppLayoutFooterProps>> = [
  { legend: 'Normal' },
  { legend: 'Disabled', props: { disabled: true } },
];

const AppLayoutFooterShowcase = componentShowcaseFactory(AppLayoutFooter);

export const Basic: IStory = {
  render: (props) => (
    <AppLayoutFooterShowcase props={props} cols={states} rows={variants} />
  ),
  args: defaultArgs,
};

export default meta;
