import { createVar } from '@vanilla-extract/css';
import { calc } from '@vanilla-extract/css-utils';

import type { IComponentThemeFactory } from '~/utils/component/componentThemeFactory';
import { MoveHandle } from '~/components/MoveHandle';
import { themeTokens } from '~/components/Theme';
import { componentThemeFactory } from '~/utils/component/componentThemeFactory';
import { createComponentTheme } from '~/utils/component/createComponentTheme';
import { px, space } from '~/utils/css';
import { createStyles } from '~/utils/css/createStyles';
import { modifierSelector } from '~/utils/css/modifierSelector';
import { COMPONENT_NAME } from './SortableItem.constants';

type IModifier = 'drag-handle-position';

const [tokensClassName, tokens] = createComponentTheme(COMPONENT_NAME);

const localVars = {
  dragHandleSpacing: createVar(),
};

const classNames = createStyles({
  dragHandle: ({ root }) => ({
    position: 'absolute',

    vars: {
      [localVars.dragHandleSpacing]: calc.subtract(
        calc.divide(themeTokens.density.minTargetSize, 2),
        calc.divide(MoveHandle.theme.tokens.icon.size, 2),
        px(space(1)),
      ),
    },

    selectors: {
      [modifierSelector<IModifier>({ 'drag-handle-position': 'top' }, root)]: {
        top: localVars.dragHandleSpacing,
        left: '50%',
        transform: 'translate(-50%, -100%)',
      },
      [modifierSelector<IModifier>({ 'drag-handle-position': 'bottom' }, root)]:
        {
          bottom: localVars.dragHandleSpacing,
          left: '50%',
          transform: 'translate(-50%, 100%)',
        },
      [modifierSelector<IModifier>({ 'drag-handle-position': 'left' }, root)]: {
        left: localVars.dragHandleSpacing,
        top: '50%',
        transform: 'translate(-100%, -50%)',
      },
      [modifierSelector<IModifier>({ 'drag-handle-position': 'right' }, root)]:
        {
          right: localVars.dragHandleSpacing,
          top: '50%',
          transform: 'translate(100%, -50%)',
        },
    },
  }),
});

export type ISortableItemThemeFactory = IComponentThemeFactory<{
  styleName: keyof typeof classNames;
  tokens: typeof tokens;
  modifier: IModifier;
}>;

export const sortableItemTheme =
  componentThemeFactory<ISortableItemThemeFactory>({
    classNames,
    tokensClassName,
    tokens,
  });
