import type { IInteraction } from '~/hooks/useInteractions';
import type { IComponentThemeFactory } from '~/utils/component/componentThemeFactory';
import { IconButton } from '~/components/IconButton';
import { themeTokens } from '~/components/Theme';
import { componentThemeFactory } from '~/utils/component/componentThemeFactory';
import { createComponentTheme } from '~/utils/component/createComponentTheme';
import { modifierSelector } from '~/utils/css';
import { createStyles } from '~/utils/css/createStyles';
import { overrideTokens } from '~/utils/css/overrideTokens';
import { px } from '~/utils/css/px';
import { COMPONENT_NAME } from './MoveHandle.constants';

type IModifier = IInteraction;

const [tokensClassName, tokens] = createComponentTheme(COMPONENT_NAME, {
  icon: {
    size: px(16),
    color: {
      normal: themeTokens.colorScheme.onSurface,
      focused: 'inherit',
      hovered: 'inherit',
      pressed: 'inherit',
      dragged: 'inherit',
    },
    opacity: {
      normal: themeTokens.state.opacity.disabled,
      focused: '1',
      hovered: '1',
      pressed: '1',
      dragged: '1',
    },
  },
});

const classNames = createStyles({
  root: {
    cursor: 'grab',

    vars: overrideTokens(IconButton.theme.tokens, {
      icon: {
        size: tokens.icon.size,
        color: tokens.icon.color,
        opacity: tokens.icon.opacity,
      },
    }),

    selectors: {
      [modifierSelector<IModifier>('dragged')]: {
        cursor: 'grabbing',
      },
    },
  },
});

export type IMoveHandleThemeFactory = IComponentThemeFactory<{
  styleName: keyof typeof classNames;
  tokens: typeof tokens;
}>;

export const moveHandleTheme = componentThemeFactory<IMoveHandleThemeFactory>({
  classNames,
  tokensClassName,
  tokens,
});
