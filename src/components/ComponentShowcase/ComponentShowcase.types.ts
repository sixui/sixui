import type { IStylesProps } from '~/utils/styles/useComponentTheme';
import type { IBoxProps } from '../Box';
import type { IComponentShowcaseThemeFactory } from './ComponentShowcase.css';
import { IComponentFactory } from '~/utils/component/componentFactory';

export type IComponentShowcaseFactory<T> = IComponentFactory<{
  props: IComponentShowcaseProps<T>;
  ref: HTMLDivElement;
  theme: IComponentShowcaseThemeFactory;
}>;

export type IComponentPresentation<TComponentProps = object> = {
  props?: Partial<TComponentProps>;
  legend?: React.ReactNode;
  hiddenIndexes?: Array<number>;
  component?: React.FC<TComponentProps>;
};

export type IComponentShowcaseOwnProps<TComponentProps> = {
  props: TComponentProps;
  groups?: Array<IComponentPresentation<TComponentProps>>;
  cols?: Array<IComponentPresentation<TComponentProps>>;
  rows?: Array<IComponentPresentation<TComponentProps>>;
  horizontalAlign?: 'start' | 'center' | 'end' | 'stretch';
  verticalAlign?: 'start' | 'center' | 'end' | 'stretch';
  rowLegendPosition?: 'start' | 'top' | 'bottom';
  fullWidth?: boolean;
};

export interface IComponentShowcaseProps<TComponentProps>
  extends IBoxProps,
    IStylesProps<IComponentShowcaseThemeFactory>,
    IComponentShowcaseOwnProps<TComponentProps> {}
