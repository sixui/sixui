import type { IComponentFactory } from '~/utils/component/componentFactory';
import type { IStylesProps } from '~/utils/styles/useComponentTheme';
import type { IBoxProps } from '../Box';
import type { paperBaseTheme, IPaperBaseThemeFactory } from './PaperBase.css';

export type IPaperBaseOwnProps = {
  children?: React.ReactNode;
};

export interface IPaperBaseProps
  extends IBoxProps,
    IStylesProps<IPaperBaseThemeFactory>,
    IPaperBaseOwnProps {}

export type IPaperBaseFactory = IComponentFactory<{
  props: IPaperBaseProps;
  defaultRef: HTMLDivElement;
  defaultRoot: 'div';
  theme: typeof paperBaseTheme;
}>;
