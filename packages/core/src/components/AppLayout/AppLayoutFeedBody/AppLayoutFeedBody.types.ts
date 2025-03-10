import type { IBoxProps } from '~/components/Box';
import type { IComponentThemeProps } from '~/components/Theme';
import type { IComponentFactory } from '~/utils/component/componentFactory';
import type { IAppLayoutBodyOwnProps } from '../AppLayoutBody';
import type {
  appLayoutFeedBodyTheme,
  IAppLayoutFeedBodyThemeFactory,
} from './AppLayoutFeedBody.css';

export interface IAppLayoutFeedBodyFeedPaneRendererProps {
  grid?: boolean;
}

export interface IAppLayoutFeedBodyOwnProps extends IAppLayoutBodyOwnProps {
  feedPane:
    | React.ReactNode
    | ((props: IAppLayoutFeedBodyFeedPaneRendererProps) => React.ReactNode);
}

export interface IAppLayoutFeedBodyProps
  extends IBoxProps,
    IComponentThemeProps<IAppLayoutFeedBodyThemeFactory>,
    IAppLayoutFeedBodyOwnProps {}

export type IAppLayoutFeedBodyFactory = IComponentFactory<{
  props: IAppLayoutFeedBodyProps;
  ref: HTMLDivElement;
  theme: typeof appLayoutFeedBodyTheme;
}>;
