import { forwardRef, useMemo } from 'react';

import type {
  IPlaceholderStyleKey,
  IPlaceholderStyleVarKey,
} from './Placeholder.styledefs';
import type { IPlaceholderProps } from './PlaceholderProps';
import { stylesCombinatorFactory } from '@/helpers/stylesCombinatorFactory';
import { stylePropsFactory } from '@/helpers/stylePropsFactory';
import { useComponentThemeOld } from '@/hooks/useComponentThemeOld';

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

    const { theme } = useComponentThemeOld('Placeholder');
    const stylesCombinator = useMemo(
      () => stylesCombinatorFactory(theme.styles, styles),
      [theme.styles, styles],
    );
    const sxf = useMemo(
      () =>
        stylePropsFactory<IPlaceholderStyleKey, IPlaceholderStyleVarKey>(
          stylesCombinator,
        ),
      [stylesCombinator],
    );

    return (
      <div
        {...sxf(
          'host',
          shape === 'rectangular'
            ? 'host$rectangular'
            : shape === 'circular'
              ? 'host$circular'
              : null,
          theme.vars,
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
