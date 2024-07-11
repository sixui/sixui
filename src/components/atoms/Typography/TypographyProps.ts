import type { IContainerProps } from '@/helpers/types';
import type { IPolymorphicComponentPropsWithRef } from '@/helpers/react/polymorphicComponentTypes';
import type { ITypographyStyleKey } from './Typography.styledefs';

export const TYPOGRAPHY_DEFAULT_TAG = 'span';

export type ITypographyOwnProps = IContainerProps<ITypographyStyleKey> & {
  variant?: 'display' | 'headline' | 'title' | 'body' | 'label';
  size?: 'lg' | 'md' | 'sm';
  children?: React.ReactNode;
  gutterBottom?: boolean;
};

export type ITypographyProps<
  TRoot extends React.ElementType = typeof TYPOGRAPHY_DEFAULT_TAG,
> = IPolymorphicComponentPropsWithRef<TRoot, ITypographyOwnProps>;
