import type { IComponentFactory } from '~/utils/component/componentFactory';
import type { IComponentThemeProps } from '~/utils/styles/useComponentTheme';
import type { IBoxProps } from '../Box';
import type {
  componentShowcaseTheme,
  IComponentShowcaseThemeFactory,
} from './ComponentShowcase.css';

export interface IComponentPresentation<TComponentProps = object> {
  props?: Partial<TComponentProps>;
  legend?: React.ReactNode;
  hiddenIndexes?: Array<number>;
  component?: React.FC<TComponentProps>;
}

export interface IComponentShowcaseOwnProps<TComponentProps> {
  props: TComponentProps;
  groups?: Array<IComponentPresentation<TComponentProps>>;
  cols?: Array<IComponentPresentation<TComponentProps>>;
  rows?: Array<IComponentPresentation<TComponentProps>>;
  horizontalAlign?: 'start' | 'center' | 'end' | 'stretch';
  verticalAlign?: 'start' | 'center' | 'end' | 'stretch';
  rowLegendPosition?: 'start' | 'top' | 'bottom';
  fullWidth?: boolean;
}

export interface IComponentShowcaseProps<TComponentProps>
  extends IBoxProps,
    IComponentThemeProps<IComponentShowcaseThemeFactory>,
    IComponentShowcaseOwnProps<TComponentProps> {}

export type IComponentShowcaseFactory<T> = IComponentFactory<{
  props: IComponentShowcaseProps<T>;
  ref: HTMLDivElement;
  theme: typeof componentShowcaseTheme;
}>;
