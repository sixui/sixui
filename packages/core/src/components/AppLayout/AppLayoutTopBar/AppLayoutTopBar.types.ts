import type { IBoxProps } from '~/components/Box';
import type { IPaperOwnProps } from '~/components/Paper';
import type { IComponentThemeProps } from '~/components/Theme';
import type { IComponentFactory } from '~/utils/component/componentFactory';
import type {
  appLayoutTopBarTheme,
  IAppLayoutTopBarThemeFactory,
} from './AppLayoutTopBar.css';

export interface IAppLayoutTopBarOwnProps extends IPaperOwnProps {
  children?: React.ReactNode;
  divider?: boolean;
  wide?: boolean;
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
