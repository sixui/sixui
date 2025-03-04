import type { IComponentThemeFactory } from '~/utils/component/componentThemeFactory';
import { componentThemeFactory } from '~/utils/component/componentThemeFactory';
import { createComponentTheme } from '~/utils/component/createComponentTheme';
import { createStyles } from '~/utils/css/createStyles';
import { modifierSelector } from '~/utils/css/modifierSelector';
import { px } from '~/utils/css/px';
import { themeTokens } from '~/components/Theme/theme.css';
import { COMPONENT_NAME } from './Scrim.constants';

type IModifier = 'fixed' | 'center' | 'blurred';

const [tokensClassName, tokens] = createComponentTheme(COMPONENT_NAME, {
  container: {
    shape: px(themeTokens.shape.corner.none),
    filter: 'none',
    blurredFilter: 'blur(2px)',
    color: `color-mix(in srgb, ${themeTokens.colorScheme.scrim} 50%, transparent)`,
  },
});

const classNames = createStyles({
  root: {
    inset: 0,
    position: 'absolute',
    borderRadius: tokens.container.shape,
    backdropFilter: tokens.container.filter,
    backgroundColor: tokens.container.color,

    selectors: {
      [modifierSelector<IModifier>('fixed')]: {
        position: 'fixed',
      },
      [modifierSelector<IModifier>('center')]: {
        display: 'grid',
        placeItems: 'center',
      },
      [modifierSelector<IModifier>('blurred')]: {
        backdropFilter: tokens.container.blurredFilter,
      },
    },
  },
});

export type IScrimThemeFactory = IComponentThemeFactory<{
  styleName: keyof typeof classNames;
  tokens: typeof tokens;
  modifier: IModifier;
}>;

export const scrimTheme = componentThemeFactory<IScrimThemeFactory>({
  classNames,
  tokensClassName,
  tokens,
});
