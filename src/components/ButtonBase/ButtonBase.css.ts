import {
  stylesFactory,
  type IStylesFactory,
} from '~/utils/styles/stylesFactory';
import { getModifierSelector } from '~/helpers/styles/getModifierSelector';
import { createStyles } from '~/utils/styles/createStyles';

export const classNames = createStyles({
  root: {
    display: 'inline-flex',
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

        // FIXME:
        backgroundColor: 'red',
        border: '2px solid red',
      },
    },
  }),
  outline: {
    position: 'absolute',
    inset: 0,
    borderRadius: 'inherit',
    pointerEvents: 'none',
  },
});

export type IButtonBaseStylesFactory = IStylesFactory<{
  styleName: keyof typeof classNames;
}>;

export const buttonBaseStyles = stylesFactory<IButtonBaseStylesFactory>({
  classNames,
  tokens: undefined,
});
