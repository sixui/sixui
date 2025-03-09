import { createVar } from '@vanilla-extract/css';
import { calc } from '@vanilla-extract/css-utils';

import type { IInteraction } from '~/hooks/useInteractions';
import type { IComponentThemeFactory } from '~/utils/component/componentThemeFactory';
import { IconButton } from '~/components/IconButton';
import { componentThemeFactory } from '~/utils/component/componentThemeFactory';
import { createComponentTheme } from '~/utils/component/createComponentTheme';
import { modifierSelector, space } from '~/utils/css';
import { createStyles } from '~/utils/css/createStyles';
import { overrideTokens } from '~/utils/css/overrideTokens';
import { px } from '~/utils/css/px';
import { themeTokens } from '~/components/Theme/theme.css';
import { COMPONENT_NAME } from './MoveHandle.constants';

type IModifier = IInteraction | 'position';

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

const localVars = {
  dragHandleSpacing: createVar(),
};

const classNames = createStyles({
  root: {
    cursor: 'grab',

    vars: {
      [localVars.dragHandleSpacing]: calc.subtract(
        calc.divide(themeTokens.density.minTargetSize, 2),
        calc.divide(tokens.icon.size, 2),
        px(space('$xs')),
      ),
      ...overrideTokens(IconButton.theme.tokens, {
        icon: {
          size: tokens.icon.size,
          color: tokens.icon.color,
          opacity: tokens.icon.opacity,
        },
      }),
    },

    selectors: {
      [modifierSelector<IModifier>('dragged')]: {
        cursor: 'grabbing',
      },
      [modifierSelector<IModifier>('position')]: {
        position: 'absolute',
      },
      [modifierSelector<IModifier>({ position: 'top' })]: {
        top: localVars.dragHandleSpacing,
        left: '50%',
        transform: 'translate(-50%, -100%)',
      },
      [modifierSelector<IModifier>({ position: 'bottom' })]: {
        bottom: localVars.dragHandleSpacing,
        left: '50%',
        transform: 'translate(-50%, 100%)',
      },
      [modifierSelector<IModifier>({ position: 'left' })]: {
        left: localVars.dragHandleSpacing,
        top: '50%',
        transform: 'translate(-100%, -50%)',
      },
      [modifierSelector<IModifier>({ position: 'right' })]: {
        right: localVars.dragHandleSpacing,
        top: '50%',
        transform: 'translate(100%, -50%)',
      },
    },
  },
});

export type IMoveHandleThemeFactory = IComponentThemeFactory<{
  styleName: keyof typeof classNames;
  tokens: typeof tokens;
  modifier: IModifier;
}>;

export const moveHandleTheme = componentThemeFactory<IMoveHandleThemeFactory>({
  classNames,
  tokensClassName,
  tokens,
});
