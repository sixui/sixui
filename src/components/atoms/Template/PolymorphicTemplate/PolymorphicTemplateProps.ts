import type { IContainerProps } from '@/helpers/types';
import type { IPolymorphicComponentPropsWithRef } from '@/helpers/react/polymorphicComponentTypes';
import type { IPolymorphicTemplateStyleKey } from './PolymorphicTemplate.styledefs';

export const POLYMORPHIC_TEMPLATE_DEFAULT_TAG = 'div';

export type IPolymorphicTemplateOwnProps =
  IContainerProps<IPolymorphicTemplateStyleKey> & {
    children?: React.ReactNode;
  };

export type IPolymorphicTemplateProps<
  TRoot extends React.ElementType = typeof POLYMORPHIC_TEMPLATE_DEFAULT_TAG,
> = IPolymorphicComponentPropsWithRef<TRoot, IPolymorphicTemplateOwnProps>;
