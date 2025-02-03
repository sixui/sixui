import type { IComponentThemeFactory } from '~/utils/component/componentThemeFactory';
import { themeTokens } from '~/components/Theme';
import { componentThemeFactory } from '~/utils/component/componentThemeFactory';
import { createComponentTheme } from '~/utils/component/createComponentTheme';
import { createStyles } from '~/utils/css/createStyles';
import { modifierSelector } from '~/utils/css/modifierSelector';
import { px } from '~/utils/css/px';
import { COMPONENT_NAME } from './CircularProgressIndicator.constants';

export type ICircularProgressIndicatorModifier = 'disabled' | 'negative';

const [tokensClassName, tokens] = createComponentTheme(COMPONENT_NAME, {
  color: {
    normal: 'currentColor',
    negative: themeTokens.colorScheme.error,
    disabled: themeTokens.colorScheme.onSurface,
  },
  opacity: {
    disabled: themeTokens.state.opacity.disabled,
  },
  size: px('1em'),
  containerPadding: px(0),
  strokeWidth: `round(up, ${px(2)}, 1px)`,
});

const classNames = createStyles({
  root: {
    display: 'inline-flex',
    verticalAlign: 'middle',
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
    color: tokens.color.normal,
    borderColor: 'currentColor',

    width: tokens.size,
    height: tokens.size,

    selectors: {
      [modifierSelector<ICircularProgressIndicatorModifier>('negative')]: {
        color: tokens.color.negative,
      },
    },
  },
  layer: {
    position: 'absolute',
    inset: 0,
    borderColor: 'inherit',
    borderRadius: 'inherit',
    overflow: 'hidden',
  },
  progress: {
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: '0%',
    alignSelf: 'stretch',
    margin: tokens.containerPadding,
  },
});

export type ICircularProgressIndicatorThemeFactory = IComponentThemeFactory<{
  styleName: keyof typeof classNames;
  tokens: typeof tokens;
}>;

export const circularProgressIndicatorTheme =
  componentThemeFactory<ICircularProgressIndicatorThemeFactory>({
    classNames,
    tokensClassName,
    tokens,
  });
