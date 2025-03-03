import type { IComponentThemeFactory } from '~/utils/component/componentThemeFactory';
import { PaperBase } from '~/components/PaperBase';
import { themeTokens } from '~/components/Theme';
import { componentThemeFactory } from '~/utils/component/componentThemeFactory';
import { createComponentTheme } from '~/utils/component/createComponentTheme';
import { createStyles } from '~/utils/css/createStyles';
import { overrideTokens } from '~/utils/css/overrideTokens';
import { px } from '~/utils/css/px';
import { space } from '~/utils/css/space';
import { typography } from '~/utils/css/typography';
import { elevationLevelPreset } from '~/components/Elevation/Elevation.css';
import { COMPONENT_NAME } from './PlainTooltipContent.constants';

const [tokensClassName, tokens] = createComponentTheme(COMPONENT_NAME, {
  container: {
    color: themeTokens.colorScheme.inverseSurface,
    shape: px(themeTokens.shape.corner.xs),
    maxWidth: px(215),
    minHeight: px(24),
    topSpace: px(space('$sm')),
    bottomSpace: px(space('$sm')),
    leadingSpace: px(space('$sm')),
    trailingSpace: px(space('$sm')),
    elevation: elevationLevelPreset[0],
  },
  supportingText: {
    color: themeTokens.colorScheme.inverseOnSurface,
    typography: themeTokens.typeScale.body.sm,
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
    paddingTop: tokens.container.topSpace,
    paddingBottom: tokens.container.bottomSpace,
    paddingLeft: tokens.container.leadingSpace,
    paddingRight: tokens.container.trailingSpace,
    maxWidth: tokens.container.maxWidth,
    minHeight: tokens.container.minHeight,
  },
  supportingText: {
    color: tokens.supportingText.color,
    ...typography(tokens.supportingText.typography),
  },
  cursor: {
    fill: tokens.container.color,
  },
});

export type IPlainTooltipContentThemeFactory = IComponentThemeFactory<{
  styleName: keyof typeof classNames;
  tokens: typeof tokens;
}>;

export const plainTooltipContentTheme =
  componentThemeFactory<IPlainTooltipContentThemeFactory>({
    classNames,
    tokensClassName,
    tokens,
  });
