import type { Meta, StoryObj } from '@storybook/react';

import type { IComponentPresentation } from '../ComponentShowcase';
import type { IBreadcrumbsProps } from './Breadcrumbs.types';
import { componentShowcaseFactory } from '../ComponentShowcase';
import { Breadcrumbs } from './Breadcrumbs';

const meta = {
  component: Breadcrumbs,
} satisfies Meta<typeof Breadcrumbs>;

type IStory = StoryObj<typeof meta>;

const defaultArgs = {
  children: 'Breadcrumbs',
} satisfies Partial<IBreadcrumbsProps>;

const variants: Array<IComponentPresentation<IBreadcrumbsProps>> = [
  { legend: 'None', props: { variant: false } },
  { legend: 'Primary', props: { variant: 'primary' } },
];

const states: Array<IComponentPresentation<IBreadcrumbsProps>> = [
  { legend: 'Normal' },
  { legend: 'Disabled', props: { disabled: true } },
];

const BreadcrumbsShowcase = componentShowcaseFactory(Breadcrumbs);

export const Basic: IStory = {
  render: (props) => (
    <BreadcrumbsShowcase props={props} cols={states} rows={variants} />
  ),
  args: defaultArgs,
};

export default meta;
