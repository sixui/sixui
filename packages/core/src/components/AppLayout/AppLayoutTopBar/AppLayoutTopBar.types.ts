import type { IBoxProps } from '~/components/Box';
import type { IComponentThemeProps } from '~/components/Theme';
import type { ITopAppBarOwnProps } from '~/components/TopAppBar';
import type { IComponentFactory } from '~/utils/component/componentFactory';
import type {
  appLayoutTopBarTheme,
  IAppLayoutTopBarThemeFactory,
} from './AppLayoutTopBar.css';

export interface IAppLayoutTopBarOwnProps extends ITopAppBarOwnProps {
  wide?: boolean;
  divider?: boolean;
}

export interface IAppLayoutTopBarProps
  extends IBoxProps,
    IComponentThemeProps<IAppLayoutTopBarThemeFactory>,
    IAppLayoutTopBarOwnProps {}

export type IAppLayoutTopBarFactory = IComponentFactory<{
  props: IAppLayoutTopBarProps;
  ref: HTMLDivElement;
  theme: typeof appLayoutTopBarTheme;
}>;
