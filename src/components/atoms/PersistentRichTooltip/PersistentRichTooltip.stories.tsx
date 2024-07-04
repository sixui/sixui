import type { Meta, StoryObj } from '@storybook/react';

import {
  PersistentRichTooltip,
  type IPersistentRichTooltipProps,
} from './PersistentRichTooltip';
import { Button } from '../Button';
import { PersistentRichTooltipExample } from './PersistentRichTooltipExample';

const meta = {
  component: PersistentRichTooltip,
} satisfies Meta<typeof PersistentRichTooltip>;

type IStory = StoryObj<typeof meta>;

const defaultArgs = {
  subhead: 'Rich tooltip',
  supportingText:
    'Grant value is calculated using the closing stock price from the day before the grant date. Amounts do not reflect tax withholding.',
  actions: ({ onClose }) => (
    <>
      <Button variant='text'>Action</Button>
      <Button variant='text' onClick={onClose}>
        Dismiss
      </Button>
    </>
  ),
} satisfies Partial<IPersistentRichTooltipProps>;

export const Basic: IStory = {
  render: (props) => <PersistentRichTooltipExample {...props} />,
  args: defaultArgs,
};

export default meta;
