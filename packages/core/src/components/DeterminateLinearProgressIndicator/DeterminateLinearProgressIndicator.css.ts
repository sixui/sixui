import { calc } from '@vanilla-extract/css-utils';

import type { IComponentThemeFactory } from '~/utils/component/componentThemeFactory';
import { themeTokens } from '~/components/Theme';
import { componentThemeFactory } from '~/utils/component/componentThemeFactory';
import { createComponentTheme } from '~/utils/component/createComponentTheme';
import { modifierSelector } from '~/utils/css';
import { createStyles } from '~/utils/css/createStyles';
import { px } from '~/utils/css/px';
import { COMPONENT_NAME } from './DeterminateLinearProgressIndicator.constants';

type IModifier = 'disabled';

const [tokensClassName, tokens] = createComponentTheme(COMPONENT_NAME, {
  progress: '0',
  spacing: px(4),
  activeIndicator: {
    thickness: `round(up, ${px(4)}, 1px)`,
    shape: px(themeTokens.shape.corner.full),
    color: {
      normal: themeTokens.colorScheme.primary,
      disabled: themeTokens.colorScheme.onSurface,
    },
    opacity: {
      disabled: themeTokens.state.opacity.disabled,
    },
  },
  track: {
    thickness: `round(up, ${px(4)}, 1px)`,
    shape: px(themeTokens.shape.corner.full),
    color: {
      normal: themeTokens.colorScheme.secondaryContainer,
      disabled: themeTokens.colorScheme.onSurface,
    },
    opacity: {
      disabled: themeTokens.state.containerOpacity.disabled,
    },
  },
  stopIndicator: {
    size: `round(up, ${px(4)}, 1px)`,
    shape: `round(up, ${px(4)}, 1px)`,
    color: {
      normal: themeTokens.colorScheme.primary,
      disabled: themeTokens.colorScheme.onSurface,
    },
    opacity: {
      disabled: themeTokens.state.opacity.disabled,
    },
  },
});

const classNames = createStyles({
  root: {
    position: 'relative',
    display: 'flex',
    flexDirection: 'row',
  },
  activeIndicator: ({ root }) => ({
    width: calc.multiply(tokens.progress, '100%'),
    marginRight: `min(${calc.subtract(
      '100%',
      calc.multiply(tokens.progress, '100%'),
    )}, min(${calc.multiply(tokens.progress, '100%')}, ${tokens.spacing}))`,
    height: tokens.activeIndicator.thickness,
    borderRadius: tokens.activeIndicator.shape,
    backgroundColor: tokens.activeIndicator.color.normal,

    transitionProperty: 'width, margin-right',
    transitionDuration: themeTokens.motion.duration.medium3,
    transitionTimingFunction: themeTokens.motion.easing.emphasized.decelerate,

    selectors: {
      [modifierSelector<IModifier>('disabled', root)]: {
        backgroundColor: tokens.activeIndicator.color.disabled,
        opacity: tokens.activeIndicator.opacity.disabled,
      },
    },
  }),
  track: ({ root }) => ({
    height: tokens.track.thickness,
    borderRadius: tokens.track.shape,
    backgroundColor: tokens.track.color.normal,
    flexGrow: 1,

    selectors: {
      [modifierSelector<IModifier>('disabled', root)]: {
        backgroundColor: tokens.track.color.disabled,
        opacity: tokens.track.opacity.disabled,
      },
    },
  }),
  stopIndicator: ({ root }) => ({
    position: 'absolute',
    top: 0,
    right: 0,
    width: tokens.stopIndicator.size,
    height: tokens.stopIndicator.size,
    borderRadius: tokens.stopIndicator.shape,
    backgroundColor: tokens.stopIndicator.color.normal,

    selectors: {
      [modifierSelector<IModifier>('disabled', root)]: {
        backgroundColor: tokens.stopIndicator.color.disabled,
        opacity: tokens.stopIndicator.opacity.disabled,
      },
    },
  }),
});

export type IDeterminateLinearProgressIndicatorThemeFactory =
  IComponentThemeFactory<{
    styleName: keyof typeof classNames;
    tokens: typeof tokens;
    modifier: IModifier;
  }>;

export const determinateLinearProgressIndicatorTheme =
  componentThemeFactory<IDeterminateLinearProgressIndicatorThemeFactory>({
    classNames,
    tokensClassName,
    tokens,
  });
