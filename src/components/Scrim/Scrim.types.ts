import type { IPolymorphicComponentFactory } from '~/utils/component/polymorphicComponentFactory';
import type { IComponentThemeProps } from '~/utils/styles/useComponentTheme';
import type { IBoxProps } from '../Box';
import type { IScrimThemeFactory, scrimTheme } from './Scrim.css';

export interface IScrimOwnProps {
  children?: React.ReactNode;
  fixed?: boolean;
  center?: boolean;
}

export interface IScrimProps
  extends IBoxProps,
    IComponentThemeProps<IScrimThemeFactory>,
    IScrimOwnProps {}

export type IScrimFactory = IPolymorphicComponentFactory<{
  props: IScrimProps;
  defaultRef: HTMLDivElement;
  defaultRoot: 'div';
  theme: typeof scrimTheme;
}>;
