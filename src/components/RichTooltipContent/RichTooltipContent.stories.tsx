import type { Meta, StoryObj } from '@storybook/react';

import type { IRichTooltipContentProps } from './RichTooltipContent.types';
import { Button } from '../Button';
import { componentShowcaseFactory } from '../ComponentShowcase';
import { RichTooltipContent } from './RichTooltipContent';

// https://m3.material.io/components/richtooltips/overview

const meta = {
  component: RichTooltipContent,
} satisfies Meta<typeof RichTooltipContent>;

type IStory = StoryObj<typeof meta>;

const RichTooltipContentShowcase = componentShowcaseFactory(RichTooltipContent);

const defaultArgs = {
  supportingText:
    "Rich tooltips bring attention to a particular element of feature that warrants the user's focus.",
} satisfies Partial<IRichTooltipContentProps>;

export const Basic: IStory = {
  render: (props) => <RichTooltipContent {...props} />,
  args: defaultArgs,
};

export const Scales: IStory = {
  render: (props) => (
    <RichTooltipContentShowcase
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

export const WithSubhead: IStory = {
  render: (props) => <RichTooltipContent {...props} />,
  args: {
    ...defaultArgs,
    subhead: 'Rich tooltip',
  },
};

export const WithAction: IStory = {
  render: (props) => <RichTooltipContent {...props} />,
  args: {
    ...defaultArgs,
    actions: <Button variant="text">Action</Button>,
  },
};

export const WithSubheadAndActions: IStory = {
  render: (props) => <RichTooltipContent {...props} />,
  args: {
    ...defaultArgs,
    subhead: 'Rich tooltip',
    actions: (
      <>
        <Button variant="text">Action 1</Button>
        <Button variant="text">Action 2</Button>
      </>
    ),
  },
};

export default meta;
