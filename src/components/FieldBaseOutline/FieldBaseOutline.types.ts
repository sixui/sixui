import type { IComponentFactory } from '~/utils/component/componentFactory';
import type { IComponentThemeProps } from '~/utils/styles/useComponentTheme';
import type { IInteractions } from '~/hooks/useInteractions';
import type { IBoxProps } from '../Box';
import type {
  fieldBaseOutlineTheme,
  IFieldBaseOutlineThemeFactory,
} from './FieldBaseOutline.css';

export interface IFieldBaseOutlineOwnProps {
  interactions?: IInteractions;
  hasLabel?: boolean;
  hasError?: boolean;
  populated?: boolean;
  disabled?: boolean;
  children?: React.ReactNode;
}

export interface IFieldBaseOutlineProps
  extends IBoxProps,
    IComponentThemeProps<IFieldBaseOutlineThemeFactory>,
    IFieldBaseOutlineOwnProps,
    IFieldBaseOutlineOwnProps {}

export type IFieldBaseOutlineFactory = IComponentFactory<{
  props: IFieldBaseOutlineProps;
  ref: HTMLDivElement;
  theme: typeof fieldBaseOutlineTheme;
}>;
