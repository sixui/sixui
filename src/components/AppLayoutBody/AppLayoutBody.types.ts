import type { IComponentFactory } from '~/utils/component/componentFactory';
import type { IComponentThemeProps } from '~/utils/styles/useComponentTheme';
import type { IBoxProps } from '../Box';
import type { IPaperOwnProps } from '../Paper';
import type {
  appLayoutBodyTheme,
  IAppLayoutBodyThemeFactory,
} from './AppLayoutBody.css';

export interface IAppLayoutBodyOwnProps extends IPaperOwnProps {
  children?: React.ReactNode;
  hasHeader?: boolean;
  hasAside?: boolean;
}

export interface IAppLayoutBodyProps
  extends IBoxProps,
    IComponentThemeProps<IAppLayoutBodyThemeFactory>,
    IAppLayoutBodyOwnProps {}

export type IAppLayoutBodyFactory = IComponentFactory<{
  props: IAppLayoutBodyProps;
  ref: HTMLDivElement;
  theme: typeof appLayoutBodyTheme;
}>;
