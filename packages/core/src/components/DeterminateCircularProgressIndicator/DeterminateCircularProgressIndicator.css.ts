import { calc } from '@vanilla-extract/css-utils';
import cx from 'clsx';

import type { ICircularProgressIndicatorModifier } from '~/components/CircularProgressIndicator/CircularProgressIndicator.css';
import type { IComponentThemeFactory } from '~/utils/component/componentThemeFactory';
import { themeTokens } from '~/components/Theme';
import { componentThemeFactory } from '~/utils/component/componentThemeFactory';
import { createComponentTheme } from '~/utils/component/createComponentTheme';
import { px } from '~/utils/css';
import { createStyles } from '~/utils/css/createStyles';
import { mergeClassNames } from '~/utils/css/mergeClassNames';
import { modifierSelector } from '~/utils/css/modifierSelector';
import { typography } from '~/utils/css/typography';
import { deepMerge } from '~/utils/deepMerge';
import { circularProgressIndicatorTheme } from '~/components/CircularProgressIndicator/CircularProgressIndicator.css';
import { COMPONENT_NAME } from './DeterminateCircularProgressIndicator.constants';

type IModifier = ICircularProgressIndicatorModifier;

const parentStyles = circularProgressIndicatorTheme;

const [tokensClassName, tokens] = createComponentTheme(COMPONENT_NAME, {
  label: {
    color: {
      normal: themeTokens.colorScheme.onSurface,
      disabled: themeTokens.colorScheme.onSurface,
    },
    opacity: {
      disabled: themeTokens.state.opacity.disabled,
    },
    typography: themeTokens.typeScale.label.sm,
  },
});

const ANTIALIASING_EPSILON = '0.5px';
const MASK_RADIUS = calc.subtract(
  calc.divide(parentStyles.tokens.size, 2),
  parentStyles.tokens.strokeWidth,
  parentStyles.tokens.containerPadding,
);

const classNames = createStyles({
  root: {
    borderRadius: themeTokens.shape.corner.circle,
  },
  ring: ({ root }) => ({
    position: 'absolute',
    overflow: 'hidden',
    inset: 0,
    mask: `radial-gradient(transparent ${calc.subtract(MASK_RADIUS, ANTIALIASING_EPSILON)}, black ${calc.add(MASK_RADIUS, ANTIALIASING_EPSILON)})`,

    selectors: {
      [modifierSelector<IModifier>('disabled', root)]: {
        color: tokens.label.color.disabled,
        opacity: themeTokens.state.opacity.disabled,
      },
    },
  }),
  label: ({ root }) => ({
    position: 'absolute',
    overflow: 'hidden',
    inset: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '100%',
    color: tokens.label.color.normal,
    ...typography(tokens.label.typography),
    fontSize: px(calc.multiply(0.25, '1em')),

    selectors: {
      [modifierSelector<IModifier>('disabled', root)]: {
        color: tokens.label.color.disabled,
        opacity: tokens.label.opacity.disabled,
      },
    },
  }),
});

export type IDeterminateCircularProgressIndicatorThemeFactory =
  IComponentThemeFactory<{
    styleName: keyof typeof parentStyles.classNames | keyof typeof classNames;
    tokens: typeof parentStyles.tokens | typeof tokens;
    modifier: IModifier;
  }>;

export const determinateCircularProgressIndicatorTheme =
  componentThemeFactory<IDeterminateCircularProgressIndicatorThemeFactory>({
    classNames: mergeClassNames(parentStyles.classNames, classNames),
    tokensClassName: cx(parentStyles.tokensClassName, tokensClassName),
    tokens: deepMerge(parentStyles.tokens, tokens),
  });
