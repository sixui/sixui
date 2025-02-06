import type { IBoxProps } from '~/components/Box';
import type { IDrawerAsideOwnProps } from '~/components/DrawerAside';
import type { IStandardAsideOwnProps } from '~/components/StandardAside';
import type { IComponentThemeProps } from '~/components/Theme';
import type { IComponentFactory } from '~/utils/component/componentFactory';
import type { asideTheme, IAsideThemeFactory } from './Aside.css';

export interface IAsideOwnProps
  extends IStandardAsideOwnProps,
    IDrawerAsideOwnProps {
  drawer?: boolean;
  drawerRef?: React.RefObject<HTMLDivElement>;
}

export interface IAsideProps
  extends IBoxProps,
    IComponentThemeProps<IAsideThemeFactory>,
    IAsideOwnProps {}

export type IAsideFactory = IComponentFactory<{
  props: IAsideProps;
  ref: HTMLDivElement;
  theme: typeof asideTheme;
}>;
