import type { Meta, StoryObj } from '@storybook/react';
import stylex from '@stylexjs/stylex';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartPlus } from '@fortawesome/free-solid-svg-icons';

import type { IButtonBaseProps } from './ButtonBase.types';
import { colorSchemeTokens } from '~/themes/base/colorScheme.stylex';
import { shapeTokens } from '~/themes/base/shape.stylex';
import { stateLayerTokens } from '../StateLayer/StateLayer.stylex';
import { focusRingTokens } from '../FocusRing/FocusRing.stylex';
import { ButtonBase } from './ButtonBase';
import { spacingTokens } from '~/themes/base/spacing.stylex';
import { outlineTokens } from '~/themes/base/outline.stylex';

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
    padding: spacingTokens.padding$2,
    borderRadius: shapeTokens.corner$md,
    color: {
      default: colorSchemeTokens.onSurface,
      ':is([data-pressed])': colorSchemeTokens.onSurface,
    },
  },
  outline: {
    borderWidth: outlineTokens.width$xs,
    borderStyle: 'solid',
    borderColor: colorSchemeTokens.outline,
  },
});

const stateLayerStyles = stylex.create({
  host: {
    [stateLayerTokens.color$pressed]: colorSchemeTokens.primary,
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
