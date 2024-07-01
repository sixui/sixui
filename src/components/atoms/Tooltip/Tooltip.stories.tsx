import type { Meta, StoryObj } from '@storybook/react';

import { Tooltip, type ITooltipProps } from './Tooltip';

const meta = {
  component: Tooltip,
} satisfies Meta<typeof Tooltip>;

type IStory = StoryObj<typeof meta>;

const defaultArgs = {
  content:
    'Grant value is calculated using the closing stock price from the day before the grant date. Amounts do not reflect tax withholding.',
} satisfies Partial<ITooltipProps>;

export const Basic: IStory = {
  render: (props) => <Tooltip {...props} />,
  args: {
    ...defaultArgs,
    children: <div>Need help?</div>,
  },
};

export default meta;
