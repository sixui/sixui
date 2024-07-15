import type { Meta, StoryObj } from '@storybook/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faBolt, faCloud } from '@fortawesome/free-solid-svg-icons';

import type { IRichTooltipProps } from './RichTooltip.types';
import {
  ComponentShowcase,
  type IComponentPresentation,
} from '@/components/ComponentShowcase';
import { IconButton } from '@/components/IconButton';
import { Button } from '@/components/Button';
import { sbHandleEvent } from '@/helpers/sbHandleEvent';
import { PersistentRichTooltipExample } from './PersistentRichTooltipExample';
import { RichTooltip } from './RichTooltip';

const meta = {
  component: RichTooltip,
} satisfies Meta<typeof RichTooltip>;

type IStory = StoryObj<typeof meta>;

const defaultArgs = {
  subhead: 'Rich tooltip',
  supportingText:
    'Grant value is calculated using the closing stock price from the day before the grant date. Amounts do not reflect tax withholding.',
  actions: ({ onClose }) => (
    <>
      <Button variant='text'>Action 1</Button>
      <Button variant='text' onClick={onClose}>
        Dismiss
      </Button>
    </>
  ),
  onOpenChange: (...args) => void sbHandleEvent('openChange', args),
} satisfies Partial<IRichTooltipProps>;

const cols: Array<IComponentPresentation<IRichTooltipProps>> = [
  {
    props: {
      children: <IconButton icon={<FontAwesomeIcon icon={faStar} />} />,
    },
  },
  {
    props: {
      children: <IconButton icon={<FontAwesomeIcon icon={faBolt} />} />,
    },
  },
  {
    props: {
      children: <IconButton icon={<FontAwesomeIcon icon={faCloud} />} />,
    },
  },
];

export const Basic: IStory = {
  render: (props) => (
    <ComponentShowcase component={RichTooltip} props={props} cols={cols} />
  ),
  args: defaultArgs,
};

export const Persistent: IStory = {
  render: (props) => <PersistentRichTooltipExample {...props} />,
  args: defaultArgs,
};

export default meta;
