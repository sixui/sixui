import type { Meta, StoryObj } from '@storybook/react-vite';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import type { IComponentPresentation } from '~/components/ComponentShowcase';
import type { IRichTooltipProps } from './RichTooltip.types';
import { Button } from '~/components/Button';
import { componentShowcaseFactory } from '~/components/ComponentShowcase';
import { IconButton } from '~/components/IconButton';
import { sbHandleEvent } from '~/utils/sbHandleEvent';
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
      <Button
        variant="text"
        onClick={(...args) => sbHandleEvent('action:onClick', args, 1000)}
      >
        Action
      </Button>
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
      children: (
        <IconButton
          icon={<FontAwesomeIcon icon={faStar} />}
          onClick={() => {}}
        />
      ),
    },
  },
  {
    props: {
      children: (
        <IconButton
          icon={<FontAwesomeIcon icon={faStar} />}
          onClick={() => {}}
        />
      ),
    },
  },
  {
    props: {
      children: (
        <IconButton
          icon={<FontAwesomeIcon icon={faStar} />}
          onClick={() => {}}
        />
      ),
    },
  },
];

const RichTooltipShowcase = componentShowcaseFactory(RichTooltip);

export const Standard: IStory = {
  render: (props) => <RichTooltipShowcase props={props} cols={cols} />,
  args: defaultArgs as IRichTooltipProps,
};

export const Persistent: IStory = {
  render: (props) => (
    <RichTooltip {...props}>
      <Button>Click to show</Button>
    </RichTooltip>
  ),
  args: {
    ...(defaultArgs as IRichTooltipProps),
    persistent: true,
  },
};

export default meta;
