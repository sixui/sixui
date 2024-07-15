import type { Meta, StoryObj } from '@storybook/react';
import stylex from '@stylexjs/stylex';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartPlus } from '@fortawesome/free-solid-svg-icons';

import type { IButtonBaseProps } from './ButtonBase.types';
import { colorRolesVars } from '@/themes/base/vars/colorRoles.stylex';
import { shapeVars } from '@/themes/base/vars/shape.stylex';
import { componentVars as stateLayerVars } from '@/themes/base/StateLayer/StateLayer.stylex';
import { focusRingTokens } from '@/components/utils/FocusRing/FocusRing.stylex';
import { ButtonBase } from './ButtonBase';

const meta = {
  component: ButtonBase,
} satisfies Meta<typeof ButtonBase>;

type IStory = StoryObj<typeof meta>;

const styles = stylex.create({
  host: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
});

const defaultArgs = {
  children: (
    <div {...stylex.props(styles.host)}>
      <FontAwesomeIcon icon={faCartPlus} />
      <span>Add to cart</span>
    </div>
  ),
} satisfies Partial<IButtonBaseProps>;

export const Unstyled: IStory = {
  render: (props) => <ButtonBase {...props} />,
  args: defaultArgs,
};

const buttonStyles = stylex.create({
  host: {
    padding: 8,
    borderRadius: shapeVars.corner$md,
    color: {
      default: colorRolesVars.onSurface,
      ':is([data-pressed])': colorRolesVars.onSurface,
    },
  },
  outline: {
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: colorRolesVars.outline,
  },
});

const stateLayerStyles = stylex.create({
  host: {
    [stateLayerVars.color$pressed]: colorRolesVars.primary,
  },
});

const focusRingStyles = stylex.create({
  host: {
    [focusRingTokens.shape]: shapeVars.corner$md,
  },
});

export const Styled: IStory = {
  render: (props) => <ButtonBase {...props} />,
  args: {
    ...defaultArgs,
    styles: buttonStyles,
    innerStyles: {
      stateLayer: stateLayerStyles,
      focusRing: focusRingStyles,
    },
  },
};

export default meta;
