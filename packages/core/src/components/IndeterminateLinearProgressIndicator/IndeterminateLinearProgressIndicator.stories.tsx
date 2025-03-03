import type { Meta, StoryObj } from '@storybook/react';

import type { IComponentPresentation } from '~/components/ComponentShowcase';
import type { IIndeterminateLinearProgressIndicatorProps } from './IndeterminateLinearProgressIndicator.types';
import { componentShowcaseFactory } from '~/components/ComponentShowcase';
import { IndeterminateLinearProgressIndicator } from './IndeterminateLinearProgressIndicator';

const meta = {
  component: IndeterminateLinearProgressIndicator,
} satisfies Meta<typeof IndeterminateLinearProgressIndicator>;

type IStory = StoryObj<typeof meta>;

const defaultArgs = {
  w: '288px',
} satisfies Partial<IIndeterminateLinearProgressIndicatorProps>;

const rows: Array<
  IComponentPresentation<IIndeterminateLinearProgressIndicatorProps>
> = [{ legend: 'Normal' }, { legend: 'Disabled', props: { disabled: true } }];

const IndeterminateLinearProgressIndicatorShowcase = componentShowcaseFactory(
  IndeterminateLinearProgressIndicator,
);

export const Basic: IStory = {
  render: (props) => (
    <IndeterminateLinearProgressIndicatorShowcase
      horizontalAlign="start"
      verticalAlign="center"
      props={props}
      rows={rows}
    />
  ),
  args: defaultArgs,
};

export const Scales: IStory = {
  render: (props) => (
    <IndeterminateLinearProgressIndicatorShowcase
      horizontalAlign="start"
      verticalAlign="center"
      props={props}
      rows={[
        { legend: 'Extra small', props: { scale: 'xs' } },
        { legend: 'Small', props: { scale: 'sm' } },
        { legend: 'Medium', props: { scale: 'md' } },
        { legend: 'Large', props: { scale: 'lg' } },
        { legend: 'Extra large', props: { scale: 'xl' } },
      ]}
    />
  ),
  args: defaultArgs,
};

export default meta;
