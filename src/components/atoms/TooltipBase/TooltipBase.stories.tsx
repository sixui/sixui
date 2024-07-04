import type { Meta, StoryObj } from '@storybook/react';
import stylex from '@stylexjs/stylex';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faBolt, faCloud } from '@fortawesome/free-solid-svg-icons';

import {
  ComponentShowcase,
  type IComponentPresentation,
} from '@/components/utils/ComponentShowcase';
import { colorRolesVars } from '@/themes/base/vars/colorRoles.stylex';
import { sbHandleEvent } from '@/helpers/sbHandleEvent';
import { TooltipBase, type ITooltipBaseProps } from './TooltipBase';
import { IconButton } from '../IconButton';

const meta = {
  component: TooltipBase,
} satisfies Meta<typeof TooltipBase>;

type IStory = StoryObj<typeof meta>;

const styles = stylex.create({
  tooltip: {
    backgroundColor: colorRolesVars.inverseSurface,
    color: colorRolesVars.inverseOnSurface,
    padding: 8,
    maxWidth: 200,
  },
  cursor: {
    fill: colorRolesVars.inverseSurface,
  },
});

const TOOLTIP_CONTENT =
  'Grant value is calculated using the closing stock price from the day before the grant date. Amounts do not reflect tax withholding.';

const defaultArgs = {
  onOpenChange: (...args) => void sbHandleEvent('openChange', args),
} satisfies Partial<ITooltipBaseProps>;

const cols: Array<IComponentPresentation<ITooltipBaseProps>> = [
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
    <ComponentShowcase component={TooltipBase} props={props} cols={cols} />
  ),
  args: {
    ...defaultArgs,
    contentRenderer: () => (
      <div {...stylex.props(styles.tooltip)}>{TOOLTIP_CONTENT}</div>
    ),
  },
};

export const WithArrowCursor: IStory = {
  render: (props) => (
    <ComponentShowcase component={TooltipBase} props={props} cols={cols} />
  ),
  args: {
    ...defaultArgs,
    cursor: 'arrow',
    contentRenderer: ({ renderCursor }) => (
      <div {...stylex.props(styles.tooltip)}>
        <div {...stylex.props(styles.cursor)}>{renderCursor?.()}</div>
        {TOOLTIP_CONTENT}
      </div>
    ),
  },
};

export const WithDotCursor: IStory = {
  render: (props) => (
    <ComponentShowcase component={TooltipBase} props={props} cols={cols} />
  ),
  args: {
    ...defaultArgs,
    cursor: 'dot',
    contentRenderer: ({ renderCursor }) => (
      <div {...stylex.props(styles.tooltip)}>
        <div {...stylex.props(styles.cursor)}>{renderCursor?.()}</div>
        {TOOLTIP_CONTENT}
      </div>
    ),
  },
};

export default meta;
