import type { Meta, StoryObj } from '@storybook/react';

import type { IComponentPresentation } from '../ComponentShowcase';
import type { IAppLayoutSideSheetProps } from './AppLayoutSideSheet.types';
import { componentShowcaseFactory } from '../ComponentShowcase';
import { AppLayoutSideSheet } from './AppLayoutSideSheet';

const meta = {
  component: AppLayoutSideSheet,
} satisfies Meta<typeof AppLayoutSideSheet>;

type IStory = StoryObj<typeof meta>;

const defaultArgs = {
  children: 'AppLayoutSideSheet',
} satisfies Partial<IAppLayoutSideSheetProps>;

const variants: Array<IComponentPresentation<IAppLayoutSideSheetProps>> = [
  { legend: 'None', props: { variant: false } },
  { legend: 'Primary', props: { variant: 'primary' } },
];

const states: Array<IComponentPresentation<IAppLayoutSideSheetProps>> = [
  { legend: 'Normal' },
  { legend: 'Disabled', props: { disabled: true } },
];

const AppLayoutSideSheetShowcase = componentShowcaseFactory(AppLayoutSideSheet);

export const Basic: IStory = {
  render: (props) => (
    <AppLayoutSideSheetShowcase props={props} cols={states} rows={variants} />
  ),
  args: defaultArgs,
};

export default meta;
