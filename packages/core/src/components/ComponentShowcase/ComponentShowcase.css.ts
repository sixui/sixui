import type { IComponentThemeFactory } from '~/utils/component/componentThemeFactory';
import { themeTokens } from '~/components/Theme';
import { componentThemeFactory } from '~/utils/component/componentThemeFactory';
import { createComponentTheme } from '~/utils/component/createComponentTheme';
import { createStyles } from '~/utils/css/createStyles';
import { px } from '~/utils/css/px';
import { typography } from '~/utils/css/typography';
import { COMPONENT_NAME } from './ComponentShowcase.constants';

const [tokensClassName, tokens] = createComponentTheme(COMPONENT_NAME, {
  legendText: {
    color: themeTokens.colorScheme.onSurfaceVariant,
    typography: themeTokens.typeScale.label.md,
  },

  outline: {
    color: themeTokens.colorScheme.onSurface,
  },
});

const classNames = createStyles({
  flex: {
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: '100%',
  },
  justifyStart: {
    justifyContent: 'flex-start',
  },
  justifyEnd: {
    justifyContent: 'flex-end',
  },
  align$start: {
    alignItems: 'start',
  },
  align$center: {
    alignItems: 'center',
  },
  align$end: {
    alignItems: 'end',
  },
  align$stretch: {
    alignItems: 'stretch',
  },
  textRight: {
    textAlign: 'right',
  },
  groupRows: {
    display: 'flex',
    flexDirection: 'column',
    gap: px(56),
    alignSelf: 'stretch',
  },
  cols: {
    display: 'flex',
  },
  gap$md: {
    gap: px(32),
  },
  gap$lg: {
    gap: px(40),
  },
  rows: {
    display: 'flex',
    flexDirection: 'column',
  },
  legendText: {
    color: tokens.legendText.color,
    ...typography(tokens.legendText.typography),
  },
  legendRow: {
    display: 'flex',
    alignItems: 'center',
    maxWidth: px(120),
  },
  leftBorder: {
    borderLeftWidth: px(themeTokens.outline.width.xs),
    borderLeftStyle: 'solid',
    borderLeftColor: tokens.outline.color,
    paddingLeft: px(32),
  },
  invisible: {
    visibility: 'hidden',
  },
  w100: {
    width: '100%',
  },
});

export type IComponentShowcaseThemeFactory = IComponentThemeFactory<{
  styleName: keyof typeof classNames;
  tokens: typeof tokens;
}>;

export const componentShowcaseTheme =
  componentThemeFactory<IComponentShowcaseThemeFactory>({
    classNames,
    tokensClassName,
    tokens,
  });
