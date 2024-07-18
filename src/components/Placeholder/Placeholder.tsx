import { forwardRef, useMemo } from 'react';

import type { IPlaceholderProps } from './Placeholder.types';
import { stylesCombinatorFactory } from '@/helpers/stylesCombinatorFactory';
import { stylePropsFactory } from '@/helpers/stylePropsFactory';
import { useComponentTheme } from '@/hooks/useComponentTheme';
import { placeholderStyles } from './Placeholder.styles';
import { placeholderTheme } from './Placeholder.stylex';

export const Placeholder = forwardRef<HTMLDivElement, IPlaceholderProps>(
  function Placeholder(props, forwardedRef) {
    const {
      styles,
      sx,
      label,
      children,
      crosshairs,
      shape = 'rounded',
      ...other
    } = props;

    const componentTheme = useComponentTheme('Placeholder');
    const stylesCombinator = useMemo(
      () => stylesCombinatorFactory(placeholderStyles, styles),
      [styles],
    );
    const sxf = useMemo(
      () => stylePropsFactory(stylesCombinator),
      [stylesCombinator],
    );

    return (
      <div
        {...sxf(
          placeholderTheme,
          componentTheme.overridenStyles,
          'host',
          shape === 'rectangular'
            ? 'host$rectangular'
            : shape === 'circular'
              ? 'host$circular'
              : null,
          sx,
        )}
        ref={forwardedRef}
        {...other}
      >
        {crosshairs ? <div {...sxf('guides')} /> : null}
        {label ? <div {...sxf('label')}>{label}</div> : null}
        {children}
      </div>
    );
  },
);
