import type { IComponentThemeFactory } from '~/utils/styles/componentThemeFactory';
import { getModifierSelector } from '~/helpers/styles/getModifierSelector';
import { componentThemeFactory } from '~/utils/styles/componentThemeFactory';
import { createStyles } from '~/utils/styles/createStyles';
import { cardTheme } from '../Card/Card.css';

type IModifier = 'type';

const classNames = createStyles({
  root: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    borderRadius: cardTheme.tokens.container.shape,
    flexShrink: 0,

    selectors: {
      [getModifierSelector<IModifier>({ type: 'image' })]: {
        objectFit: 'cover',
      },
    },
  },
});

export type ICardMediaThemeFactory = IComponentThemeFactory<{
  styleName: keyof typeof classNames;
  modifier: IModifier;
}>;

export const cardMediaTheme = componentThemeFactory<ICardMediaThemeFactory>({
  classNames,
  tokens: undefined,
});
