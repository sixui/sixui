import type { IBoxProps } from '~/components/Box';
import type { IComponentThemeProps } from '~/components/Theme';
import type { IComponentFactory } from '~/utils/component/componentFactory';
import type { IFlexOwnProps } from '../Flex';
import type {
  customizableThemeTheme,
  ICustomizableThemeThemeFactory,
} from './CustomizableTheme.css';

export interface ICustomizableThemeOwnProps extends IFlexOwnProps {
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
