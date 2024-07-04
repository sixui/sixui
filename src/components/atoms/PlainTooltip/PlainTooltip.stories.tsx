import type { Meta, StoryObj } from '@storybook/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faBolt, faCloud } from '@fortawesome/free-solid-svg-icons';

import {
  ComponentShowcase,
  type IComponentPresentation,
} from '@/components/utils/ComponentShowcase';
import { IconButton } from '@/components/atoms/IconButton';
import { PlainTooltip, type IPlainTooltipProps } from './PlainTooltip';

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
    <ComponentShowcase component={PlainTooltip} props={props} cols={cols} />
  ),
  args: defaultArgs,
};

export default meta;
