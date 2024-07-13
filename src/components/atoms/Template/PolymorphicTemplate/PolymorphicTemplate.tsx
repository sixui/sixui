import { forwardRef, useMemo } from 'react';

import type {
  IPolymorphicRef,
  IWithAsProp,
} from '@/helpers/react/polymorphicComponentTypes';
import type {
  IPolymorphicTemplateStyleKey,
  IPolymorphicTemplateStyleVarKey,
} from './PolymorphicTemplate.styledefs';
import { stylesCombinatorFactory } from '@/helpers/stylesCombinatorFactory';
import { stylePropsFactory } from '@/helpers/stylePropsFactory';
import { useComponentThemeOld } from '@/hooks/useComponentThemeOld';
import {
  POLYMORPHIC_TEMPLATE_DEFAULT_TAG,
  type IPolymorphicTemplateOwnProps,
  type IPolymorphicTemplateProps,
} from './PolymorphicTemplateProps';

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

    const { theme } = useComponentThemeOld('Template');
    const styleCombinator = useMemo(
      () => stylesCombinatorFactory(theme.styles, styles),
      [theme.styles, styles],
    );
    const sxf = useMemo(
      () =>
        stylePropsFactory<
          IPolymorphicTemplateStyleKey,
          IPolymorphicTemplateStyleVarKey
        >(styleCombinator),
      [styleCombinator],
    );

    return (
      <Component sx={[theme.vars, sx]} {...other} ref={forwardedRef}>
        <div {...sxf('host')}>{children}</div>
      </Component>
    );
  },
);
