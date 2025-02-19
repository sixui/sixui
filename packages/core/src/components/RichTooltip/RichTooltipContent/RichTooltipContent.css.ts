import { calc } from '@vanilla-extract/css-utils';

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
import { COMPONENT_NAME } from './RichTooltipContent.constants';

type IModifier = 'with-actions';

const [tokensClassName, tokens] = createComponentTheme(COMPONENT_NAME, {
  container: {
    color: themeTokens.colorScheme.surfaceContainer,
    shape: px(themeTokens.shape.corner.md),
    maxWidth: px(315),
    elevation: elevationLevelPreset[2],
    topSpace: px(space(3)),
    bottomSpace: {
      normal: px(space(3)),
      withActions: px(space(1)),
    },
    leadingSpace: px(space(4)),
    trailingSpace: px(space(4)),
    actionsBottomSpace: px(space(2)),
  },
  subhead: {
    color: themeTokens.colorScheme.onSurfaceVariant,
    typography: themeTokens.typeScale.title.sm,
  },
  supportingText: {
    color: themeTokens.colorScheme.onSurfaceVariant,
    typography: themeTokens.typeScale.body.md,
  },
});

const classNames = createStyles({
  root: {
    vars: overrideTokens(PaperBase.theme.tokens, {
      container: {
        color: tokens.container.color,
        elevation: tokens.container.elevation,
        shape: tokens.container.shape,
      },
    }),

    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    width: 'max-content',
    paddingLeft: tokens.container.leadingSpace,
    paddingRight: tokens.container.trailingSpace,
    maxWidth: tokens.container.maxWidth,
  },
  content: ({ root }) => ({
    paddingTop: tokens.container.topSpace,
    paddingBottom: tokens.container.bottomSpace.normal,

    selectors: {
      [modifierSelector<IModifier>('with-actions', root)]: {
        paddingBottom: tokens.container.bottomSpace.withActions,
      },
    },
  }),
  subhead: {
    color: tokens.subhead.color,
    ...typography(tokens.subhead.typography),
  },
  supportingText: {
    color: tokens.supportingText.color,
    ...typography(tokens.supportingText.typography),
  },
  actions: {
    paddingBottom: tokens.container.actionsBottomSpace,
    marginLeft: calc.negate(px(space(3))),
    marginRight: calc.negate(px(space(3))),
  },
  cursor: {
    fill: themeTokens.colorScheme.primary,
  },
});

export type IRichTooltipContentThemeFactory = IComponentThemeFactory<{
  styleName: keyof typeof classNames;
  tokens: typeof tokens;
  modifier: IModifier;
}>;

export const richTooltipContentTheme =
  componentThemeFactory<IRichTooltipContentThemeFactory>({
    classNames,
    tokensClassName,
    tokens,
  });
