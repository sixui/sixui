import type { IPolymorphicComponentFactory } from '~/utils/polymorphicComponentFactory';
import type { IStylesProps } from '~/hooks/useStyles2';
import type { IBoxProps } from '../Box';
import type { textStyles, ITextStylesFactory } from './Text.css';

export type ITextVariant = 'display' | 'headline' | 'title' | 'body' | 'label';

export type ITextSize = 'sm' | 'md' | 'lg';

export type ITextProps = IBoxProps &
  IStylesProps<ITextStylesFactory> & {
    children?: React.ReactNode;
    variant?: ITextVariant;
    size?: ITextSize;
    gutterBottom?: boolean;
    dimmed?: boolean;
    truncate?: boolean;
    lineClamp?: number;
  };

export type ITextFactory = IPolymorphicComponentFactory<{
  props: ITextProps;
  defaultRef: HTMLDivElement;
  defaultRoot: 'div';
  styles: typeof textStyles;
}>;
