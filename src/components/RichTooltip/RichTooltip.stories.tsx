import type { Meta, StoryObj } from '@storybook/react';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import type { IComponentPresentation } from '../ComponentShowcase';
import type { IRichTooltipProps } from './RichTooltip.types';
import { sbHandleEvent } from '~/helpers/sbHandleEvent';
import { Button } from '../Button';
import { makeComponentShowcase } from '../ComponentShowcase';
import { IconButton } from '../IconButton';
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
      <Button variant="text">Action 1</Button>
      <Button variant="text" onClick={onClose}>
        Dismiss
      </Button>
    </>
  ),
  onOpen: (...args) => void sbHandleEvent('open', args),
  onClose: (...args) => void sbHandleEvent('close', args),
} satisfies Partial<IRichTooltipProps>;

const cols: Array<IComponentPresentation<IRichTooltipProps>> = [
  {
    props: {
      children: <IconButton icon={<FontAwesomeIcon icon={faStar} />} />,
    },
  },
  {
    props: {
      children: <IconButton icon={<FontAwesomeIcon icon={faStar} />} />,
    },
  },
  {
    props: {
      children: <IconButton icon={<FontAwesomeIcon icon={faStar} />} />,
    },
  },
];

const RichTooltipShowcase = makeComponentShowcase(RichTooltip);

export const Standard: IStory = {
  render: (props) => <RichTooltipShowcase props={props} cols={cols} />,
  args: defaultArgs as IRichTooltipProps,
};

export const Persistent: IStory = {
  render: (props) => (
    <RichTooltip {...props}>
      <Button>Show</Button>
    </RichTooltip>
  ),
  args: {
    ...(defaultArgs as IRichTooltipProps),
    persistent: true,
  },
};

export default meta;
