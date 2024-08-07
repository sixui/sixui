import type { IBaseProps } from '../Base';
import type { ITypographyStylesKey } from './Typography.styles';

export type ITypographyVariant =
  | 'display'
  | 'headline'
  | 'title'
  | 'body'
  | 'label';

export type ITypographySize = 'lg' | 'md' | 'sm';

export type ITypographyProps = IBaseProps<ITypographyStylesKey> & {
  variant?: ITypographyVariant;
  size?: ITypographySize;
  children?: React.ReactNode;
  gutterBottom?: boolean;
};
