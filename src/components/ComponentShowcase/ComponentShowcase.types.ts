import type { IStylesProps } from '~/hooks/useStyles2';
import type { IBoxProps } from '../Box';
import type { IComponentShowcaseStylesFactory } from './ComponentShowcase.css';
import { IComponentFactory } from '~/utils/componentFactory';

export type IComponentShowcaseFactory<T> = IComponentFactory<{
  props: IComponentShowcaseProps<T>;
  ref: HTMLDivElement;
  styles: IComponentShowcaseStylesFactory;
}>;

export type IComponentPresentation<TComponentProps = object> = {
  props?: Partial<TComponentProps>;
  legend?: React.ReactNode;
  hiddenIndexes?: Array<number>;
  component?: React.FC<TComponentProps>;
};

export type IComponentShowcaseProps<TComponentProps> = IBoxProps &
  IStylesProps<IComponentShowcaseStylesFactory> & {
    props: TComponentProps;
    groups?: Array<IComponentPresentation<TComponentProps>>;
    cols?: Array<IComponentPresentation<TComponentProps>>;
    rows?: Array<IComponentPresentation<TComponentProps>>;
    horizontalAlign?: 'start' | 'center' | 'end' | 'stretch';
    verticalAlign?: 'start' | 'center' | 'end' | 'stretch';
    rowLegendPosition?: 'start' | 'top' | 'bottom';
    fullWidth?: boolean;
  };
