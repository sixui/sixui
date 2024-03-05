import { forwardRef, useMemo } from 'react';

import type { IContainerProps } from '@/components/utils/Container';
import type {
  ITemplateStyleKey,
  ITemplateStyleVarKey,
} from './Template.styledefs';
import { stylesCombinatorFactory } from '@/helpers/stylesCombinatorFactory';
import { stylePropsFactory } from '@/helpers/stylePropsFactory';
import { useComponentTheme } from '@/hooks/useComponentTheme';

export type IBasicTemplateProps = IContainerProps<
  ITemplateStyleKey,
  ITemplateStyleVarKey
> & {
  children?: React.ReactNode;
};

export const BasicTemplate = forwardRef<HTMLDivElement, IBasicTemplateProps>(
  function BasicTemplate(props, ref) {
    const { children, ...other } = props;

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

    return (
      <div
        {...styleProps(['host', other.sx], [theme.vars, other.theme])}
        ref={ref}
      >
        {children}
      </div>
    );
  },
);
