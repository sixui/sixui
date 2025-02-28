import type { IComponentThemeFactory } from '~/utils/component/componentThemeFactory';
import { componentThemeFactory } from '~/utils/component/componentThemeFactory';
import { createComponentTheme } from '~/utils/component/createComponentTheme';
import { createStyles } from '~/utils/css/createStyles';
import { modifierSelector } from '~/utils/css/modifierSelector';
import { cardTheme } from '~/components/Card/Card.css';
import { COMPONENT_NAME } from './CardMedia.constants';

type IModifier = 'type';

const [tokensClassName, tokens] = createComponentTheme(COMPONENT_NAME);

const classNames = createStyles({
  root: {
    borderRadius: cardTheme.tokens.container.shape,
    flexShrink: 0,
  },
  content: ({ root }) => ({
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    borderRadius: 'inherit',

    selectors: {
      [modifierSelector<IModifier>({ type: 'image' }, root)]: {
        objectFit: 'cover',
      },
    },
  }),
});

export type ICardMediaThemeFactory = IComponentThemeFactory<{
  styleName: keyof typeof classNames;
  modifier: IModifier;
}>;

export const cardMediaTheme = componentThemeFactory<ICardMediaThemeFactory>({
  classNames,
  tokensClassName,
  tokens,
});
