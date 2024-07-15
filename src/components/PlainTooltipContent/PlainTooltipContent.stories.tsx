import type { Meta, StoryObj } from '@storybook/react';

import type { IPlainTooltipContentProps } from './PlainTooltipContent.types';
import { PlainTooltipContent } from './PlainTooltipContent';

// https://m3.material.io/components/plaintooltips/overview

const meta = {
  component: PlainTooltipContent,
} satisfies Meta<typeof PlainTooltipContent>;

type IStory = StoryObj<typeof meta>;

const defaultArgs = {
  supportingText:
    'Grant value is calculated using the closing stock price from the day before the grant date. Amounts do not reflect tax withholding.',
} satisfies Partial<IPlainTooltipContentProps>;

export const Basic: IStory = {
  render: (props) => <PlainTooltipContent {...props} />,
  args: defaultArgs,
};

export default meta;
