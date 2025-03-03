import type { IComponentThemeFactory } from '~/utils/component/componentThemeFactory';
import { PaperBase } from '~/components/PaperBase';
import { themeTokens } from '~/components/Theme';
import { componentThemeFactory } from '~/utils/component/componentThemeFactory';
import { createComponentTheme } from '~/utils/component/createComponentTheme';
import { createStyles } from '~/utils/css/createStyles';
import { modifierSelector } from '~/utils/css/modifierSelector';
import { overrideTokens } from '~/utils/css/overrideTokens';
import { px } from '~/utils/css/px';
import { space } from '~/utils/css/space';
import { typography } from '~/utils/css/typography';
import { elevationLevelPreset } from '~/components/Elevation/Elevation.css';
import { COMPONENT_NAME } from './SnackbarContent.constants';

type IModifier = 'with-trailing-action' | 'with-trailing-icon';

const [tokensClassName, tokens] = createComponentTheme(COMPONENT_NAME, {
  container: {
    color: themeTokens.colorScheme.onSurface,
    elevation: elevationLevelPreset[3],
    shape: px(themeTokens.shape.corner.xs),
    minWidth: px(288),
    minHeight: px(48),
  },
  supportingText: {
    color: themeTokens.colorScheme.inverseOnSurface,
    typography: themeTokens.typeScale.body.md,
  },
  action: {
    trailingSpace: px(space('$sm')),
  },
  icon: {
    trailingSpace: px(space('$md')),
  },
});

const classNames = createStyles({
  root: {
    paddingLeft: px(16),
    paddingRight: px(16),
    paddingTop: px(14),
    paddingBottom: px(14),
    minHeight: tokens.container.minHeight,
    minWidth: tokens.container.minWidth,
    display: 'flex',
    gap: px(space('$md')),
    flexDirection: 'row',
    alignItems: 'start',
    flexGrow: 'initial',
    flexWrap: 'wrap',

    vars: overrideTokens(PaperBase.theme.tokens, {
      container: {
        color: tokens.container.color,
        elevation: tokens.container.elevation,
        shape: tokens.container.shape,
      },
    }),

    selectors: {
      [modifierSelector<IModifier>('with-trailing-action')]: {
        paddingRight: tokens.action.trailingSpace,
      },
      [modifierSelector<IModifier>('with-trailing-icon')]: {
        paddingRight: tokens.icon.trailingSpace,
      },
    },
  },
  supportingText: {
    flexGrow: 1,
    color: tokens.supportingText.color,
    ...typography(tokens.supportingText.typography),
  },
  actions: {
    display: 'flex',
    flexDirection: 'row',
    gap: px(space('$sm')),
    marginLeft: 'auto',
    alignItems: 'center',
    height: tokens.supportingText.typography.lineHeight,
  },
});

export type ISnackbarContentThemeFactory = IComponentThemeFactory<{
  styleName: keyof typeof classNames;
  tokens: typeof tokens;
  modifier: IModifier;
}>;

export const snackbarContentTheme =
  componentThemeFactory<ISnackbarContentThemeFactory>({
    classNames,
    tokensClassName,
    tokens,
  });
