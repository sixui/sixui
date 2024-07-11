import type { IContainerProps } from '@/helpers/types';
import type { IComponentShowcaseStyleKey } from './ComponentShowcase.styledefs';

export type IComponentPresentation<TComponentProps> = {
  props?: Partial<TComponentProps>;
  legend?: React.ReactNode;
  hiddenIndexes?: Array<number>;
  component?: React.FC<TComponentProps>;
};

export type IComponentShowcaseProps<
  TComponentProps extends object = Record<string, never>,
> = IContainerProps<IComponentShowcaseStyleKey> & {
  component: React.FC<TComponentProps>;
  props: TComponentProps;
  groups?: Array<IComponentPresentation<TComponentProps>>;
  cols?: Array<IComponentPresentation<TComponentProps>>;
  rows?: Array<IComponentPresentation<TComponentProps>>;
  horizontalAlign?: 'start' | 'center' | 'end' | 'stretch';
  verticalAlign?: 'start' | 'center' | 'end' | 'stretch';
  rowLegendPosition?: 'start' | 'top' | 'bottom';
  fullWidth?: boolean;
};
