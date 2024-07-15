import type { Meta, StoryObj } from '@storybook/react';
import stylex from '@stylexjs/stylex';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartPlus } from '@fortawesome/free-solid-svg-icons';

import type { IButtonBaseProps } from './ButtonBase.types';
import { colorRolesTokens } from '@/themes/base/tokens/colorRoles.stylex';
import { shapeTokens } from '@/themes/base/tokens/shape.stylex';
import { stateLayerTokens } from '@/components/utils/StateLayer/StateLayer.stylex';
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
    borderRadius: shapeTokens.corner$md,
    color: {
      default: colorRolesTokens.onSurface,
      ':is([data-pressed])': colorRolesTokens.onSurface,
    },
  },
  outline: {
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: colorRolesTokens.outline,
  },
});

const stateLayerStyles = stylex.create({
  host: {
    [stateLayerTokens.color$pressed]: colorRolesTokens.primary,
  },
});

const focusRingStyles = stylex.create({
  host: {
    [focusRingTokens.shape]: shapeTokens.corner$md,
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
