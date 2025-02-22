import type { IComponentThemeFactory } from '~/utils/component/componentThemeFactory';
import { themeTokens } from '~/components/Theme';
import { componentThemeFactory } from '~/utils/component/componentThemeFactory';
import { createComponentTheme } from '~/utils/component/createComponentTheme';
import { createStyles } from '~/utils/css/createStyles';
import { px } from '~/utils/css/px';
import { COMPONENT_NAME } from './Diagonals.constants';

const [tokensClassName, tokens] = createComponentTheme(COMPONENT_NAME, {
  color: themeTokens.colorScheme.outlineVariant,
  width: px(1),
  opacity: 'unset',
});

const classNames = createStyles({
  root: {
    overflow: 'hidden',
    borderRadius: 'inherit',
    position: 'absolute',
    inset: 0,
    zIndex: -1,
  },
  svg: {
    height: '100%',
    width: '100%',
  },
  line: {
    stroke: tokens.color,
    strokeWidth: tokens.width,
    opacity: tokens.opacity,
    vectorEffect: 'non-scaling-stroke',
  },
});

export type IDiagonalsThemeFactory = IComponentThemeFactory<{
  styleName: keyof typeof classNames;
  tokens: typeof tokens;
}>;

export const diagonalsTheme = componentThemeFactory<IDiagonalsThemeFactory>({
  classNames,
  tokensClassName,
  tokens,
});
