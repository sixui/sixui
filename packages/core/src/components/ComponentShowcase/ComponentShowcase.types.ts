import type { IBoxProps } from '~/components/Box';
import type { IComponentThemeProps } from '~/components/Theme';
import type { IComponentFactory } from '~/utils/component/componentFactory';
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
  propsCombinationStrategy?: 'replace' | 'merge';
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

export type IComponentShowcaseFactory<TComponentProps> = IComponentFactory<{
  props: IComponentShowcaseProps<TComponentProps>;
  ref: HTMLDivElement;
  theme: typeof componentShowcaseTheme;
}>;
