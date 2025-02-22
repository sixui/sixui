import type { IBoxProps } from '~/components/Box';
import type { IComponentThemeProps } from '~/components/Theme';
import type { IPolymorphicComponentFactory } from '~/utils/component/polymorphicComponentFactory';
import type { ITextThemeFactory, textTheme } from './Text.css';

export const textVariants = [
  'display',
  'headline',
  'title',
  'body',
  'label',
] as const;
export type ITextVariant = (typeof textVariants)[number];

export type ITextSize = 'sm' | 'md' | 'lg';

export interface ITextOwnProps {
  children?: React.ReactNode;
  size?: ITextSize;
  gutterBottom?: boolean;
  dimmed?: boolean;
  truncate?: boolean;
  lineClamp?: number;
}

export interface ITextProps
  extends IBoxProps,
    IComponentThemeProps<ITextThemeFactory>,
    ITextOwnProps {}

export type ITextFactory = IPolymorphicComponentFactory<{
  props: ITextProps;
  defaultRef: HTMLDivElement;
  defaultRoot: 'div';
  theme: typeof textTheme;
}>;
