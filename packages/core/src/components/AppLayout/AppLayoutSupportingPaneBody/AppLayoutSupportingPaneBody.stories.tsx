import type { Meta, StoryObj } from '@storybook/react';

import type { IComponentPresentation } from '~/components/ComponentShowcase';
import type { IAppLayoutSupportingPaneBodyProps } from './AppLayoutSupportingPaneBody.types';
import { componentShowcaseFactory } from '~/components/ComponentShowcase';
import { AppLayoutSupportingPaneBody } from './AppLayoutSupportingPaneBody';

const meta = {
  component: AppLayoutSupportingPaneBody,
} satisfies Meta<typeof AppLayoutSupportingPaneBody>;

type IStory = StoryObj<typeof meta>;

const defaultArgs = {
  children: 'AppLayoutSupportingPaneBody',
} satisfies Partial<IAppLayoutSupportingPaneBodyProps>;

const variants: Array<
  IComponentPresentation<IAppLayoutSupportingPaneBodyProps>
> = [
  { legend: 'None', props: { variant: false } },
  { legend: 'Primary', props: { variant: 'primary' } },
];

const states: Array<IComponentPresentation<IAppLayoutSupportingPaneBodyProps>> =
  [{ legend: 'Normal' }, { legend: 'Disabled', props: { disabled: true } }];

const AppLayoutSupportingPaneBodyShowcase = componentShowcaseFactory(
  AppLayoutSupportingPaneBody,
);

export const Basic: IStory = {
  render: (props) => (
    <AppLayoutSupportingPaneBodyShowcase
      props={props}
      cols={states}
      rows={variants}
    />
  ),
  args: defaultArgs,
};

export default meta;
