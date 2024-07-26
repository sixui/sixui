import type { IContainerProps } from '~/helpers/types';
import type { IPolymorphicComponentPropsWithRef } from '~/helpers/react/polymorphicComponentTypes';
import type { ITypographyStylesKey } from './Typography.styles';

export const TYPOGRAPHY_DEFAULT_TAG = 'span';

export type ITypographyOwnProps = IContainerProps<ITypographyStylesKey> & {
  variant?: 'display' | 'headline' | 'title' | 'body' | 'label';
  size?: 'lg' | 'md' | 'sm';
  children?: React.ReactNode;
  gutterBottom?: boolean;
};

export type ITypographyProps<
  TRoot extends React.ElementType = typeof TYPOGRAPHY_DEFAULT_TAG,
> = IPolymorphicComponentPropsWithRef<TRoot, ITypographyOwnProps>;
