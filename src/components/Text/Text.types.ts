import type { IPolymorphicComponentFactory } from '~/utils/component/polymorphicComponentFactory';
import type { IComponentThemeProps } from '~/utils/styles/useComponentTheme';
import type { IBoxProps } from '../Box';
import type { ITextThemeFactory, textTheme } from './Text.css';

export type ITextVariant = 'display' | 'headline' | 'title' | 'body' | 'label';

export type ITextSize = 'sm' | 'md' | 'lg';

export interface ITextOwnProps {
  children?: React.ReactNode;
  variant?: ITextVariant;
  size?: ITextSize;
  gutterBottom?: boolean;
  dimmed?: boolean;
  truncate?: boolean;
  lineClamp?: number;
}

export interface ITextProps
  extends IBoxProps,
    IComponentThemeProps<ITextThemeFactory> {}

export type ITextFactory = IPolymorphicComponentFactory<{
  props: ITextProps;
  defaultRef: HTMLDivElement;
  defaultRoot: 'div';
  theme: typeof textTheme;
}>;
