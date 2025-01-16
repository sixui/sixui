import type { IComponentFactory } from '~/utils/component/componentFactory';
import type { IComponentThemeProps } from '~/utils/styles/useComponentTheme';
import type { IBoxProps } from '../Box';
import type {
  customizableThemeTheme,
  ICustomizableThemeThemeFactory,
} from './CustomizableTheme.css';

export interface ICustomizableThemeOwnProps {
  children?: React.ReactNode;
  disabled?: boolean;
}

export interface ICustomizableThemeProps
  extends IBoxProps,
    IComponentThemeProps<ICustomizableThemeThemeFactory>,
    ICustomizableThemeOwnProps {}

export type ICustomizableThemeFactory = IComponentFactory<{
  props: ICustomizableThemeProps;
  ref: HTMLDivElement;
  theme: typeof customizableThemeTheme;
}>;
