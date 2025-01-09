import type { IPolymorphicComponentFactory } from '~/utils/component/polymorphicComponentFactory';
import type { IComponentThemeProps } from '~/utils/styles/useComponentTheme';
import type { IBoxProps } from '../Box';
import type { IButtonBaseOwnProps } from '../ButtonBase';
import type { CardActions } from '../CardActions';
import type { CardContent } from '../CardContent';
import type { CardMedia } from '../CardMedia';
import type { CardTitle } from '../CardTitle';
import type { cardTheme, ICardThemeFactory } from './Card.css';

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
