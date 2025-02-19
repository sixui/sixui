import type { IBoxProps } from '~/components/Box';
import type { IPaperOwnProps } from '~/components/Paper';
import type { IComponentThemeProps } from '~/components/Theme';
import type { IComponentFactory } from '~/utils/component/componentFactory';
import type {
  appLayoutBodyTheme,
  IAppLayoutBodyThemeFactory,
} from './AppLayoutBody.css';
import { IOrientation } from '~/utils/types';

export interface IAppLayoutBodyOwnProps extends IPaperOwnProps {
  children?: React.ReactNode;
  orientation?: IOrientation;
  detached?: boolean;
  fixedHeight?: boolean;
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
