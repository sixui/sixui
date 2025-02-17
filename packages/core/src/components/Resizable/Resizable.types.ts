import type { IBoxProps } from '~/components/Box';
import type { IPaperOwnProps } from '~/components/Paper';
import type { IComponentThemeProps } from '~/components/Theme';
import type { IComponentFactory } from '~/utils/component/componentFactory';
import type { IResizableThemeFactory, resizableTheme } from './Resizable.css';

export interface IResizableOwnProps extends IPaperOwnProps {
  children?: React.ReactNode;
  disabled?: boolean;
}

export interface IResizableProps
  extends IBoxProps,
    IComponentThemeProps<IResizableThemeFactory>,
    IResizableOwnProps {}

export type IResizableFactory = IComponentFactory<{
  props: IResizableProps;
  ref: HTMLDivElement;
  theme: typeof resizableTheme;
}>;
