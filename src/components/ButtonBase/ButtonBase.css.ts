import {
  stylesFactory,
  type IStylesFactory,
} from '~/utils/styles/stylesFactory';
import { getModifierSelector } from '~/helpers/styles/getModifierSelector';
import { createStyles } from '~/utils/styles/createStyles';

type IModifier = 'disabled';

export const classNames = createStyles({
  root: {
    position: 'relative',
    cursor: 'pointer',
    userSelect: 'none',
    textDecoration: 'none',
    selectors: {
      [getModifierSelector('disabled')]: {
        cursor: 'default',
        pointerEvents: 'none',
      },
    },
  },
  background: ({ root }) => ({
    position: 'absolute',
    inset: 0,
    borderRadius: 'inherit',
    pointerEvents: 'none',
    selectors: {
      [getModifierSelector('disabled', root)]: {
        cursor: 'default',
        pointerEvents: 'none',
      },
    },
  }),
  outline: {
    position: 'absolute',
    inset: 0,
    borderRadius: 'inherit',
    pointerEvents: 'none',
  },
  touchTarget: {},
  stateLayer: {},
  focusRing: {},
});

export type IButtonBaseStylesFactory = IStylesFactory<{
  styleName: keyof typeof classNames;
  modifier: IModifier;
}>;

export const buttonBaseStyles = stylesFactory<IButtonBaseStylesFactory>({
  classNames,
  tokens: undefined,
});
