import type { Meta, StoryObj } from '@storybook/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faBolt, faCloud } from '@fortawesome/free-solid-svg-icons';

import { ComponentShowcase } from '@/components/utils/ComponentShowcase';
import { Tooltip, type ITooltipProps } from './Tooltip';
import { IconButton } from '../IconButton';

const meta = {
  component: Tooltip,
} satisfies Meta<typeof Tooltip>;

type IStory = StoryObj<typeof meta>;

const defaultArgs = {
  content:
    // 'Grant value is calculated using the closing stock price from the day
    // before the grant date. Amounts do not reflect tax withholding.',
    'Grant value is calculated using the closing stock price from the day before',
} satisfies Partial<ITooltipProps>;

export const Basic: IStory = {
  render: (props) => (
    <ComponentShowcase
      component={Tooltip}
      props={props}
      cols={[
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
      ]}
    />
  ),
  args: defaultArgs,
};

export default meta;
