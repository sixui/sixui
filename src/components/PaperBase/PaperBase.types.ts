import type { IComponentFactory } from '~/utils/component/componentFactory';
import type { IComponentThemeProps } from '~/utils/styles/useComponentTheme';
import type { IBoxProps } from '../Box';
import type { paperBaseTheme, IPaperBaseThemeFactory } from './PaperBase.css';

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
