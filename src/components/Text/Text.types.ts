import type { IBaseProps } from '../Base';
import type { ITextStylesKey } from './Text.styles';

export type ITextVariant = 'display' | 'headline' | 'title' | 'body' | 'label';

export type ITextSize = 'lg' | 'md' | 'sm';

export type ITextProps = IBaseProps<ITextStylesKey> & {
  variant?: ITextVariant;
  size?: ITextSize;
  children?: React.ReactNode;
  gutterBottom?: boolean;
  dimmed?: boolean;
  truncated?: boolean;
  truncateLines?: number;
};
