import type { IComponentThemeProps } from '~/components/Theme';
import type { IComponentFactory } from '~/utils/component/componentFactory';
import type {
  IResponsiveThemeFactory,
  responsiveTheme,
} from './Responsive.css';

export interface IResponsiveOwnProps {
  children?: React.ReactNode;
}

export interface IResponsiveProps
  extends IComponentThemeProps<IResponsiveThemeFactory>,
    IResponsiveOwnProps {}

export type IResponsiveFactory = IComponentFactory<{
  props: IResponsiveProps;
  ref: HTMLDivElement;
  theme: typeof responsiveTheme;
}>;
