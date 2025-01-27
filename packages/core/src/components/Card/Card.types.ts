import type { IBoxProps } from '~/components/Box';
import type { IButtonBaseOwnProps } from '~/components/ButtonBase';
import type { IPolymorphicComponentFactory } from '~/utils/component/polymorphicComponentFactory';
import type { IComponentThemeProps } from '~/utils/styles/useComponentTheme';
import type { cardTheme, ICardThemeFactory } from './Card.css';
import type { CardActions } from './CardActions';
import type { CardContent } from './CardContent';
import type { CardMedia } from './CardMedia';
import type { CardTitle } from './CardTitle';

export type ICardVariant = 'filled' | 'elevated' | 'outlined';

export type ICardOwnProps = IButtonBaseOwnProps;

export interface ICardProps
  extends IBoxProps,
    IComponentThemeProps<ICardThemeFactory>,
    ICardOwnProps {}

export type ICardFactory = IPolymorphicComponentFactory<{
  props: ICardProps;
  defaultRef: HTMLButtonElement;
  defaultRoot: 'button';
  theme: typeof cardTheme;
  variant: ICardVariant | false;
  staticComponents: {
    Content: typeof CardContent;
    Title: typeof CardTitle;
    Media: typeof CardMedia;
    Actions: typeof CardActions;
  };
}>;
