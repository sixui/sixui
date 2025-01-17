import type { Meta, StoryObj } from '@storybook/react';

import type { IComponentPresentation } from '../ComponentShowcase';
import type { IAppHeaderProps } from './AppHeader.types';
import { componentShowcaseFactory } from '../ComponentShowcase';
import { AppHeader } from './AppHeader';

const meta = {
  component: AppHeader,
} satisfies Meta<typeof AppHeader>;

type IStory = StoryObj<typeof meta>;

const defaultArgs = {
  children: 'AppHeader',
} satisfies Partial<IAppHeaderProps>;

const variants: Array<IComponentPresentation<IAppHeaderProps>> = [
  { legend: 'None', props: { variant: false } },
  { legend: 'Primary', props: { variant: 'primary' } },
];

const states: Array<IComponentPresentation<IAppHeaderProps>> = [
  { legend: 'Normal' },
  { legend: 'Disabled', props: { disabled: true } },
];

const AppHeaderShowcase = componentShowcaseFactory(AppHeader);

export const Basic: IStory = {
  render: (props) => (
    <AppHeaderShowcase props={props} cols={states} rows={variants} />
  ),
  args: defaultArgs,
};

export default meta;
