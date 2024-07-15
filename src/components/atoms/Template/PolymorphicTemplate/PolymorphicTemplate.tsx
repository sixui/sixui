import { forwardRef, useMemo } from 'react';

import type {
  IPolymorphicRef,
  IWithAsProp,
} from '@/helpers/react/polymorphicComponentTypes';
import { stylesCombinatorFactory } from '@/helpers/stylesCombinatorFactory';
// import { stylePropsFactory } from '@/helpers/stylePropsFactory';
import { useComponentTheme } from '@/hooks/useComponentTheme';
import {
  POLYMORPHIC_TEMPLATE_DEFAULT_TAG,
  type IPolymorphicTemplateOwnProps,
  type IPolymorphicTemplateProps,
} from './PolymorphicTemplate.types';
import { polymorphicTemplateTheme } from './PolymorphicTemplate.stylex';
import { polymorphicTemplateStyles } from './PolymorphicTemplate.styles';

type IPolymorphicTemplate = <
  TRoot extends React.ElementType = typeof POLYMORPHIC_TEMPLATE_DEFAULT_TAG,
>(
  props: IPolymorphicTemplateProps<TRoot>,
) => React.ReactNode;

export const PolymorphicTemplate: IPolymorphicTemplate = forwardRef(
  function PolymorphicTemplate<
    TRoot extends React.ElementType = typeof POLYMORPHIC_TEMPLATE_DEFAULT_TAG,
  >(
    props: IPolymorphicTemplateProps<TRoot>,
    forwardedRef?: IPolymorphicRef<TRoot>,
  ) {
    const {
      as: Component = POLYMORPHIC_TEMPLATE_DEFAULT_TAG,
      styles,
      sx,
      children,
      ...other
    } = props as IWithAsProp<IPolymorphicTemplateOwnProps>;

    const { overridenStyles } = useComponentTheme('PolymorphicTemplate');
    const styleCombinator = useMemo(
      () => stylesCombinatorFactory(polymorphicTemplateStyles, styles),
      [styles],
    );
    // const sxf = useMemo(
    //   () => stylePropsFactory(styleCombinator),
    //   [styleCombinator],
    // );

    return (
      <Component
        sx={[
          polymorphicTemplateTheme,
          overridenStyles,
          styleCombinator('host'),
          sx,
        ]}
        {...other}
        ref={forwardedRef}
      >
        {children}
      </Component>
    );
  },
);
