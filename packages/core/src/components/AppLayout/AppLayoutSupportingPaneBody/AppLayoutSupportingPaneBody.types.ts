import type { IBoxProps } from '~/components/Box';
import type { IComponentThemeProps } from '~/components/Theme';
import type { IComponentFactory } from '~/utils/component/componentFactory';
import type { IAppLayoutBodyOwnProps } from '../AppLayoutBody';
import type {
  appLayoutSupportingPaneBodyTheme,
  IAppLayoutSupportingPaneBodyThemeFactory,
} from './AppLayoutSupportingPaneBody.css';

export interface IAppLayoutSupportingPaneBodyFocusPaneRendererProps {
  hasBottomSheet: boolean;
  bottomSheetOpened: boolean;
  toggleBottomSheet: (opened?: boolean) => void;
}

export interface IAppLayoutSupportingPaneBodyOwnProps
  extends IAppLayoutBodyOwnProps {
  focusPane:
    | React.ReactNode
    | ((
        props: IAppLayoutSupportingPaneBodyFocusPaneRendererProps,
      ) => React.ReactNode);
  supportingPane: React.ReactNode;
  supportingPaneAside: React.ReactNode;
  supportingPaneBottomSheet: React.ReactNode;
}

export interface IAppLayoutSupportingPaneBodyProps
  extends IBoxProps,
    IComponentThemeProps<IAppLayoutSupportingPaneBodyThemeFactory>,
    IAppLayoutSupportingPaneBodyOwnProps {}

export type IAppLayoutSupportingPaneBodyFactory = IComponentFactory<{
  props: IAppLayoutSupportingPaneBodyProps;
  ref: HTMLDivElement;
  theme: typeof appLayoutSupportingPaneBodyTheme;
}>;
