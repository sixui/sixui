import type { Meta, StoryObj } from '@storybook/react';

import type { IRichTooltipContentProps } from './RichTooltipContent.types';
import { Button } from '@/components/Button';
import { RichTooltipContent } from './RichTooltipContent';

// https://m3.material.io/components/richtooltips/overview

const meta = {
  component: RichTooltipContent,
} satisfies Meta<typeof RichTooltipContent>;

type IStory = StoryObj<typeof meta>;

const defaultArgs = {
  supportingText:
    "Rich tooltips bring attention to a particular element of feature that warrants the user's focus.",
} satisfies Partial<IRichTooltipContentProps>;

export const Basic: IStory = {
  render: (props) => <RichTooltipContent {...props} />,
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
    actions: <Button variant='text'>Action</Button>,
  },
};

export const WithSubheadAndActions: IStory = {
  render: (props) => <RichTooltipContent {...props} />,
  args: {
    ...defaultArgs,
    subhead: 'Rich tooltip',
    actions: (
      <>
        <Button variant='text'>Action 1</Button>
        <Button variant='text'>Action 2</Button>
      </>
    ),
  },
};

export default meta;
