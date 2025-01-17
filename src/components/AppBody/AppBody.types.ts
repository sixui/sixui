import type { IComponentFactory } from '~/utils/component/componentFactory';
import type { IComponentThemeProps } from '~/utils/styles/useComponentTheme';
import type { IBoxProps } from '../Box';
import type { IPaperOwnProps } from '../Paper';
import type { appBodyTheme, IAppBodyThemeFactory } from './AppBody.css';

export interface IAppBodyOwnProps extends IPaperOwnProps {
  children?: React.ReactNode;
  hasHeader?: boolean;
  hasAside?: boolean;
}

export interface IAppBodyProps
  extends IBoxProps,
    IComponentThemeProps<IAppBodyThemeFactory>,
    IAppBodyOwnProps {}

export type IAppBodyFactory = IComponentFactory<{
  props: IAppBodyProps;
  ref: HTMLDivElement;
  theme: typeof appBodyTheme;
}>;
