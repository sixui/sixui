import type { IBoxProps } from '~/components/Box';
import type { IPaperOwnProps } from '~/components/Paper';
import type { IComponentFactory } from '~/utils/component/componentFactory';
import type { IComponentThemeProps } from '~/utils/styles/useComponentTheme';
import type {
  appLayoutBodyTheme,
  IAppLayoutBodyThemeFactory,
} from './AppLayoutBody.css';
import { IOrientation } from '~/helpers/types';

export interface IAppLayoutBodyOwnProps extends IPaperOwnProps {
  children?: React.ReactNode;
  hasHeader?: boolean;
  orientation?: IOrientation;
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
