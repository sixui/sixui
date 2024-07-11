import { forwardRef, useMemo } from 'react';

import type {
  IBasicTemplateStyleKey,
  IBasicTemplateStyleVarKey,
} from './BasicTemplate.styledefs';
import type { IBasicTemplateProps } from './BasicTemplateProps';
import { stylesCombinatorFactory } from '@/helpers/stylesCombinatorFactory';
import { stylePropsFactory } from '@/helpers/stylePropsFactory';
import { useComponentTheme } from '@/hooks/useComponentTheme';

export const BasicTemplate = forwardRef<HTMLDivElement, IBasicTemplateProps>(
  function BasicTemplate(props, forwardedRef) {
    const { styles, sx, children, ...other } = props;

    const { theme } = useComponentTheme('Template');
    const stylesCombinator = useMemo(
      () => stylesCombinatorFactory(theme.styles, styles),
      [theme.styles, styles],
    );
    const sxf = useMemo(
      () =>
        stylePropsFactory<IBasicTemplateStyleKey, IBasicTemplateStyleVarKey>(
          stylesCombinator,
        ),
      [stylesCombinator],
    );

    return (
      <div {...sxf('host', theme.vars, sx)} {...other} ref={forwardedRef}>
        {children}
      </div>
    );
  },
);
