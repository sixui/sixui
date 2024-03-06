import type { Meta, StoryObj } from '@storybook/react';
import stylex from '@stylexjs/stylex';

import { ButtonBase, type IButtonBaseProps } from './ButtonBase';
import { colorRolesVars } from '@/themes/base/vars/colorRoles.stylex';
import { shapeVars } from '@/themes/base/vars/shape.stylex';
import { componentVars as stateLayerVars } from '@/themes/base/StateLayer/StateLayer.stylex';
import { componentVars as focusRingVars } from '@/themes/base/FocusRing/FocusRing.stylex';

const meta = {
  component: ButtonBase,
} satisfies Meta<typeof ButtonBase>;

type IStory = StoryObj<typeof meta>;

const defaultArgs = {
  children: 'ButtonBase',
} satisfies Partial<IButtonBaseProps>;

export const Unstyled: IStory = {
  render: (props) => <ButtonBase {...props} />,
  args: defaultArgs,
};

const buttonStyles = stylex.create({
  host: {
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: colorRolesVars.outline,
    padding: 8,
    borderRadius: shapeVars.corner$md,
    color: {
      default: colorRolesVars.onSurface,
      ':is([data-pressed])': colorRolesVars.onSurface,
    },
  },
});

const stateLayerStyles = stylex.create({
  host: {
    // eslint-disable-next-line @stylexjs/valid-styles
    [stateLayerVars.color$pressed]: colorRolesVars.primary,
  },
});

const focusRingStyles = stylex.create({
  host: {
    // eslint-disable-next-line @stylexjs/valid-styles
    [focusRingVars.shape]: shapeVars.corner$md,
  },
});

export const Styled: IStory = {
  render: (props) => <ButtonBase {...props} />,
  args: {
    ...defaultArgs,
    sx: buttonStyles.host,
    innerStyles: {
      stateLayer: stateLayerStyles,
      focusRing: focusRingStyles,
    },
  },
};

export default meta;
