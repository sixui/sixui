import type { IComponentThemeFactory } from '~/utils/component/componentThemeFactory';
import { componentThemeFactory } from '~/utils/component/componentThemeFactory';
import { createComponentTheme } from '~/utils/component/createComponentTheme';
import { modifierSelector } from '~/utils/css';
import { createStyles } from '~/utils/css/createStyles';
import { px } from '~/utils/css/px';
import { themeTokens } from '~/components/Theme/theme.css';
import { COMPONENT_NAME } from './LinearProgressIndicator.constants';

type IModifier = 'disabled';
export type ILinearProgressIndicatorModifier = IModifier;

const [tokensClassName, tokens] = createComponentTheme(COMPONENT_NAME, {
  container: {
    height: `round(up, ${px(4)}, 1px)`,
    shape: px(themeTokens.shape.corner.full),
  },
  activeIndicator: {
    color: {
      normal: themeTokens.colorScheme.primary,
      disabled: themeTokens.colorScheme.onSurface,
    },
    opacity: {
      disabled: themeTokens.state.opacity.disabled,
    },
  },
  inactiveTrack: {
    color: {
      normal: themeTokens.colorScheme.secondaryContainer,
      disabled: themeTokens.colorScheme.onSurface,
    },
    opacity: {
      disabled: themeTokens.state.containerOpacity.disabled,
    },
  },
});

const classNames = createStyles({
  root: {
    position: 'relative',
    display: 'flex',
    flexDirection: 'row',
    height: tokens.container.height,
    borderRadius: tokens.container.shape,
    minWidth: px(80),

    contentVisibility: 'auto',
    contain: 'strict',
  },
  inactiveTrack: ({ root }) => ({
    borderRadius: 'inherit',
    backgroundColor: tokens.inactiveTrack.color.normal,
    flexGrow: 1,

    selectors: {
      [modifierSelector<IModifier>('disabled', root)]: {
        backgroundColor: tokens.inactiveTrack.color.disabled,
        opacity: tokens.inactiveTrack.opacity.disabled,
      },
    },
  }),
});

export type ILinearProgressIndicatorThemeFactory = IComponentThemeFactory<{
  styleName: keyof typeof classNames;
  tokens: typeof tokens;
  modifier: ILinearProgressIndicatorModifier;
}>;

export const linearProgressIndicatorTheme =
  componentThemeFactory<ILinearProgressIndicatorThemeFactory>({
    classNames,
    tokensClassName,
    tokens,
  });
