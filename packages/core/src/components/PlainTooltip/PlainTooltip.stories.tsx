import type { Meta, StoryObj } from '@storybook/react';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import type { IComponentPresentation } from '~/components/ComponentShowcase';
import type { IPlainTooltipProps } from './PlainTooltip.types';
import { componentShowcaseFactory } from '~/components/ComponentShowcase';
import { IconButton } from '~/components/IconButton';
import { PlainTooltip } from './PlainTooltip';

const meta = {
  component: PlainTooltip,
} satisfies Meta<typeof PlainTooltip>;

type IStory = StoryObj<typeof meta>;

const defaultArgs = {
  supportingText:
    'Grant value is calculated using the closing stock price from the day before the grant date. Amounts do not reflect tax withholding.',
} satisfies Partial<IPlainTooltipProps>;

const cols: Array<IComponentPresentation<IPlainTooltipProps>> = [
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

const PlainTooltipShowcase = componentShowcaseFactory(PlainTooltip);

export const Standard: IStory = {
  render: (props) => <PlainTooltipShowcase props={props} cols={cols} />,
  args: defaultArgs as IPlainTooltipProps,
};

export default meta;
