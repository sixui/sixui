import { forwardRef, useMemo } from 'react';

import type { IBasicTemplateProps } from './BasicTemplate.types';
import { stylesCombinatorFactory } from '@/helpers/stylesCombinatorFactory';
import { stylePropsFactory } from '@/helpers/stylePropsFactory';
import { useComponentTheme } from '@/hooks/useComponentTheme';
import { basicTemplateStyles } from './BasicTemplate.styles';

export const BasicTemplate = forwardRef<HTMLDivElement, IBasicTemplateProps>(
  function BasicTemplate(props, forwardedRef) {
    const { styles, sx, children, ...other } = props;

    const componentTheme = useComponentTheme('BasicTemplate');
    const stylesCombinator = useMemo(
      () => stylesCombinatorFactory(basicTemplateStyles, styles),
      [styles],
    );
    const sxf = useMemo(
      () => stylePropsFactory(stylesCombinator),
      [stylesCombinator],
    );

    return (
      <div
        {...sxf(componentTheme.overridenStyles, 'host', sx)}
        {...other}
        ref={forwardedRef}
      >
        {children}
      </div>
    );
  },
);
