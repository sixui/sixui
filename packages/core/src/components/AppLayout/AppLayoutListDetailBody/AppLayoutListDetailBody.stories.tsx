import type { Meta, StoryObj } from '@storybook/react';

import type { IComponentPresentation } from '~/components/ComponentShowcase';
import type { IAppLayoutListDetailBodyProps } from './AppLayoutListDetailBody.types';
import { componentShowcaseFactory } from '~/components/ComponentShowcase';
import { AppLayoutListDetailBody } from './AppLayoutListDetailBody';

const meta = {
  component: AppLayoutListDetailBody,
} satisfies Meta<typeof AppLayoutListDetailBody>;

type IStory = StoryObj<typeof meta>;

const defaultArgs = {
  children: 'AppLayoutListDetailBody',
} satisfies Partial<IAppLayoutListDetailBodyProps>;

const variants: Array<IComponentPresentation<IAppLayoutListDetailBodyProps>> = [
  { legend: 'None', props: { variant: false } },
  { legend: 'Primary', props: { variant: 'primary' } },
];

const states: Array<IComponentPresentation<IAppLayoutListDetailBodyProps>> = [
  { legend: 'Normal' },
  { legend: 'Disabled', props: { disabled: true } },
];

const AppLayoutListDetailBodyShowcase = componentShowcaseFactory(
  AppLayoutListDetailBody,
);

export const Basic: IStory = {
  render: (props) => (
    <AppLayoutListDetailBodyShowcase
      props={props}
      cols={states}
      rows={variants}
    />
  ),
  args: defaultArgs,
};

export default meta;
