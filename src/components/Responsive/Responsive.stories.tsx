import type { Meta, StoryObj } from '@storybook/react';

import type { IComponentPresentation } from '../ComponentShowcase';
import type { IResponsiveProps } from './Responsive.types';
import { componentShowcaseFactory } from '../ComponentShowcase';
import { Responsive } from './Responsive';

const meta = {
  component: Responsive,
} satisfies Meta<typeof Responsive>;

type IStory = StoryObj<typeof meta>;

const defaultArgs = {
  children: 'Responsive',
} satisfies Partial<IResponsiveProps>;

const variants: Array<IComponentPresentation<IResponsiveProps>> = [
  { legend: 'None', props: { variant: false } },
  { legend: 'Primary', props: { variant: 'primary' } },
];

const states: Array<IComponentPresentation<IResponsiveProps>> = [
  { legend: 'Normal' },
  { legend: 'Disabled', props: { disabled: true } },
];

const ResponsiveShowcase = componentShowcaseFactory(Responsive);

export const Basic: IStory = {
  render: (props) => (
    <ResponsiveShowcase props={props} cols={states} rows={variants} />
  ),
  args: defaultArgs,
};

export default meta;
