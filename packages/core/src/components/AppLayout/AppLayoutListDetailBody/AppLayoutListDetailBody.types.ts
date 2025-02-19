import type { IBoxProps } from '~/components/Box';
import type { IComponentThemeProps } from '~/components/Theme';
import type { IComponentFactory } from '~/utils/component/componentFactory';
import type { IAppLayoutBodyOwnProps } from '../AppLayoutBody';
import type {
  appLayoutListDetailBodyTheme,
  IAppLayoutListDetailBodyThemeFactory,
} from './AppLayoutListDetailBody.css';

export interface IAppLayoutListDetailBodyOwnProps
  extends IAppLayoutBodyOwnProps {
  listPane: React.ReactNode;
  detailPane: React.ReactNode;
  listDetailPane: React.ReactNode;
}

export interface IAppLayoutListDetailBodyProps
  extends IBoxProps,
    IComponentThemeProps<IAppLayoutListDetailBodyThemeFactory>,
    IAppLayoutListDetailBodyOwnProps {}

export type IAppLayoutListDetailBodyFactory = IComponentFactory<{
  props: IAppLayoutListDetailBodyProps;
  ref: HTMLDivElement;
  theme: typeof appLayoutListDetailBodyTheme;
}>;
