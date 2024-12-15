import type { Meta, StoryObj } from '@storybook/react';

import type { IPlainTooltipContentProps } from './PlainTooltipContent.types';
import { componentShowcaseFactory } from '../ComponentShowcase';
import { PlainTooltipContent } from './PlainTooltipContent';

// https://m3.material.io/components/plaintooltips/overview

const meta = {
  component: PlainTooltipContent,
} satisfies Meta<typeof PlainTooltipContent>;

type IStory = StoryObj<typeof meta>;

const PlainTooltipContentShowcase =
  componentShowcaseFactory(PlainTooltipContent);

const defaultArgs = {
  supportingText:
    'Grant value is calculated using the closing stock price from the day before the grant date. Amounts do not reflect tax withholding.',
} satisfies Partial<IPlainTooltipContentProps>;

export const Standard: IStory = {
  render: (props) => <PlainTooltipContentShowcase props={props} />,
  args: defaultArgs,
};

export const Scales: IStory = {
  render: (props) => (
    <PlainTooltipContentShowcase
      props={props}
      cols={[
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
