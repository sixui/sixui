import { forwardRef, useMemo } from 'react';

import type {
  IPolymorphicComponentPropsWithRef,
  IPolymorphicRef,
  IWithAsProp,
} from '@/helpers/polymorphicComponentTypes';
import type { IContainerProps } from '@/components/utils/Container';
import type {
  ITemplateStyleKey,
  ITemplateStyleVarKey,
} from './Template.styledefs';
import { stylesCombinatorFactory } from '@/helpers/stylesCombinatorFactory';
import { stylePropsFactory } from '@/helpers/stylePropsFactory';
import { useComponentTheme } from '@/hooks/useComponentTheme';

const DEFAULT_TAG = 'div';

export type IPolymorphicTemplateOwnProps =
  IContainerProps<ITemplateStyleKey> & {
    children?: React.ReactNode;
  };

export type IPolymorphicTemplateProps<
  TRoot extends React.ElementType = typeof DEFAULT_TAG,
> = IPolymorphicComponentPropsWithRef<TRoot, IPolymorphicTemplateOwnProps>;

export const PolymorphicTemplate = forwardRef(function PolymorphicTemplate<
  TRoot extends React.ElementType = typeof DEFAULT_TAG,
>(props: IPolymorphicTemplateProps<TRoot>, ref?: IPolymorphicRef<TRoot>) {
  const { as, styles, sx, children, ...other } =
    props as IWithAsProp<IPolymorphicTemplateOwnProps>;

  const theme = useComponentTheme('Template');
  const styleCombinator = useMemo(
    () => stylesCombinatorFactory(theme.styles, styles),
    [theme.styles, styles],
  );
  const styleProps = useMemo(
    () =>
      stylePropsFactory<ITemplateStyleKey, ITemplateStyleVarKey>(
        styleCombinator,
      ),
    [styleCombinator],
  );

  const Component = as ?? DEFAULT_TAG;

  return (
    <Component {...styleProps(['host', sx], [theme.vars])} ref={ref} {...other}>
      {children}
    </Component>
  );
});
