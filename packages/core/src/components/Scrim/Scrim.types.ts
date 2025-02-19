import type { IBoxProps } from '~/components/Box';
import type { IComponentThemeProps } from '~/components/Theme';
import type { IPolymorphicComponentFactory } from '~/utils/component/polymorphicComponentFactory';
import type { IScrimThemeFactory, scrimTheme } from './Scrim.css';

export interface IScrimOwnProps {
  children?: React.ReactNode;
  fixed?: boolean;
  center?: boolean;
  disabled?: boolean;
  blurred?: boolean;
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
