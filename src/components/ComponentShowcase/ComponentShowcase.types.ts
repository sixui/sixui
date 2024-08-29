import type { IBoxProps } from '../Box';
import type { IComponentShowcaseStyleName } from './ComponentShowcase.css';

export type IComponentPresentation<TComponentProps = object> = {
  props?: Partial<TComponentProps>;
  legend?: React.ReactNode;
  hiddenIndexes?: Array<number>;
  component?: React.FC<TComponentProps>;
};

export type IComponentShowcaseProps<TComponentProps> =
  IBoxProps<IComponentShowcaseStyleName> & {
    props: TComponentProps;
    groups?: Array<IComponentPresentation<TComponentProps>>;
    cols?: Array<IComponentPresentation<TComponentProps>>;
    rows?: Array<IComponentPresentation<TComponentProps>>;
    horizontalAlign?: 'start' | 'center' | 'end' | 'stretch';
    verticalAlign?: 'start' | 'center' | 'end' | 'stretch';
    rowLegendPosition?: 'start' | 'top' | 'bottom';
    fullWidth?: boolean;
  };
