import type { IComponentFactory } from '~/utils/component/componentFactory';
import type { IComponentThemeProps } from '~/utils/styles/useComponentTheme';
import type { IBoxProps } from '../Box';
import type { cardTheme, ICardThemeFactory } from './Card.css';

export type ICardVariant = 'primary';

export interface ICardOwnProps {
  children?: React.ReactNode;
  disabled?: boolean;
}

export interface ICardProps
  extends IBoxProps,
    IComponentThemeProps<ICardThemeFactory>,
    ICardOwnProps {}

export type ICardFactory = IComponentFactory<{
  props: ICardProps;
  ref: HTMLDivElement;
  theme: typeof cardTheme;
  variant: ICardVariant | false;
}>;
