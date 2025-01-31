import type { IBoxProps } from '~/components/Box';
import type { IComponentThemeProps } from '~/components/ThemeProvider';
import type { IComponentFactory } from '~/utils/component/componentFactory';
import type { IPaperBaseThemeFactory, paperBaseTheme } from './PaperBase.css';

export interface IPaperBaseOwnProps {
  children?: React.ReactNode;
  expanded?: boolean;
  disabled?: boolean;
}

export interface IPaperBaseProps
  extends IBoxProps,
    IComponentThemeProps<IPaperBaseThemeFactory>,
    IPaperBaseOwnProps {}

export type IPaperBaseFactory = IComponentFactory<{
  props: IPaperBaseProps;
  defaultRef: HTMLDivElement;
  defaultRoot: 'div';
  theme: typeof paperBaseTheme;
}>;
