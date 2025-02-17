import { calc } from '@vanilla-extract/css-utils';

import type { IComponentThemeFactory } from '~/utils/component/componentThemeFactory';
import { componentThemeFactory } from '~/utils/component/componentThemeFactory';
import { createComponentTheme } from '~/utils/component/createComponentTheme';
import { modifierSelector, px } from '~/utils/css';
import { createStyles } from '~/utils/css/createStyles';
import { COMPONENT_NAME } from './Resizable.constants';

type IModifier = 'handle-location';

const [tokensClassName, tokens] = createComponentTheme(COMPONENT_NAME, {
  dragHandleSpace: px(12),
});

const classNames = createStyles({
  handleRight: ({ root }) => ({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',

    selectors: {
      [modifierSelector<IModifier>({ 'handle-location': 'inside' }, root)]: {
        marginRight: tokens.dragHandleSpace,
      },
      [modifierSelector<IModifier>({ 'handle-location': 'outside' }, root)]: {
        marginRight: calc.negate(tokens.dragHandleSpace),
      },
    },
  }),
  handleBottom: ({ root }) => ({
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',

    selectors: {
      [modifierSelector<IModifier>({ 'handle-location': 'inside' }, root)]: {
        marginBottom: tokens.dragHandleSpace,
      },
      [modifierSelector<IModifier>({ 'handle-location': 'outside' }, root)]: {
        marginBottom: calc.negate(tokens.dragHandleSpace),
      },
    },
  }),
});

export type IResizableThemeFactory = IComponentThemeFactory<{
  styleName: keyof typeof classNames;
  tokens: typeof tokens;
  modifier: IModifier;
}>;

export const resizableTheme = componentThemeFactory<IResizableThemeFactory>({
  classNames,
  tokensClassName,
  tokens,
});
