import type { IPolymorphicComponentFactory } from '~/utils/component/polymorphicComponentFactory';
import type { IComponentThemeProps } from '~/utils/styles/useComponentTheme';
import type { IBoxProps } from '../Box';
import type { IButtonBaseOwnProps } from '../ButtonBase';
import type { CardContent } from '../CardContent';
import type { CardTitle } from '../CardTitle';
import type { cardTheme, ICardThemeFactory } from './Card.css';

export type ICardVariant = 'filled' | 'elevated' | 'outlined';

export interface ICardOwnProps extends IButtonBaseOwnProps {
  children?: React.ReactNode;
  disabled?: boolean;
}

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
  };
}>;
