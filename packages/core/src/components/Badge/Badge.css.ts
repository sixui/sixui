import type { IComponentThemeFactory } from '~/utils/component/componentThemeFactory';
import { PaperBase } from '~/components/PaperBase';
import { componentThemeFactory } from '~/utils/component/componentThemeFactory';
import { createComponentTheme } from '~/utils/component/createComponentTheme';
import { createStyles } from '~/utils/css/createStyles';
import { overrideTokens } from '~/utils/css/overrideTokens';
import { px } from '~/utils/css/px';
import { space } from '~/utils/css/space';
import { typography } from '~/utils/css/typography';
import { themeTokens } from '~/components/Theme/theme.css';
import { COMPONENT_NAME } from './Badge.constants';

const [tokensClassName, tokens] = createComponentTheme(COMPONENT_NAME, {
  minSize: px(16),
  dotScale: '0.5', // 8px
  label: {
    color: themeTokens.colorScheme.onError,
    typography: themeTokens.typeScale.label.sm,
  },
});

const classNames = createStyles({
  root: {
    vars: overrideTokens(PaperBase.theme.tokens, {
      container: {
        color: themeTokens.colorScheme.error,
        shape: px(themeTokens.shape.corner.full),
      },
    }),

    position: 'relative',
    display: 'inline-flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    boxSizing: 'border-box',
    minWidth: tokens.minSize,
    height: tokens.minSize,
    padding: px(space('$xs')),
    transitionProperty: 'transform',
    transitionDuration: themeTokens.motion.duration.short3,
    transitionTimingFunction: themeTokens.motion.easing.standard.normal,
    whiteSpace: 'nowrap',
  },
  root$dot: {
    transform: `scale(${tokens.dotScale})`,
    padding: 0,
  },
  root$invisible: {
    transform: 'scale(0)',
  },
  label: {
    position: 'relative',
    color: tokens.label.color,
    ...typography(tokens.label.typography),
  },
});

export type IBadgeThemeFactory = IComponentThemeFactory<{
  styleName: keyof typeof classNames;
  tokens: typeof tokens;
}>;

export const badgeTheme = componentThemeFactory<IBadgeThemeFactory>({
  classNames,
  tokensClassName,
  tokens,
});
