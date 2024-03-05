import { forwardRef, useMemo } from 'react';

import type {
  IPolymorphicComponentPropsWithRef,
  IPolymorphicRef,
} from '@/helpers/polymorphicComponentTypes';
import type { IContainerProps } from '@/components/utils/Container';
import type {
  ITemplateStyleKey,
  ITemplateStyleVarKey,
} from './Template.styledefs';
import { stylesCombinatorFactory } from '@/helpers/stylesCombinatorFactory';
import { stylePropsFactory } from '@/helpers/stylePropsFactory';
import { useComponentTheme } from '@/hooks/useComponentTheme';

export type IPolymorphicTemplateProps<TRoot extends React.ElementType = 'div'> =
  IPolymorphicComponentPropsWithRef<
    TRoot,
    IContainerProps<ITemplateStyleKey, ITemplateStyleVarKey> & {
      children?: React.ReactNode;
    }
  >;

export const PolymorphicTemplate = forwardRef(function PolymorphicTemplate<
  TRoot extends React.ElementType = 'div',
>(props: IPolymorphicTemplateProps<TRoot>, ref?: IPolymorphicRef<TRoot>) {
  const { children, as, ...other } = props;

  const theme = useComponentTheme('Template');

  const styles = useMemo(
    () => stylesCombinatorFactory(theme.styles, other.styles),
    [theme.styles, other.styles],
  );
  const styleProps = useMemo(
    () =>
      stylePropsFactory<ITemplateStyleKey, ITemplateStyleVarKey>(
        styles,
        other.visualState,
      ),
    [styles, other.visualState],
  );

  const Component = as ?? 'div';

  return (
    <Component
      {...styleProps(['host', other.sx], [theme.vars, other.theme])}
      ref={ref}
    >
      {children}
    </Component>
  );
});
