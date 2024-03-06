import { forwardRef, useMemo } from 'react';

import type { IContainerProps } from '@/helpers/types';
import type {
  IPlaceholderStyleKey,
  IPlaceholderStyleVarKey,
} from './Placeholder.styledefs';
import { stylesCombinatorFactory } from '@/helpers/stylesCombinatorFactory';
import { stylePropsFactory } from '@/helpers/stylePropsFactory';
import { useComponentTheme } from '@/hooks/useComponentTheme';

export type IPlaceholderProps = IContainerProps<IPlaceholderStyleKey> & {
  label?: string;
  children?: React.ReactNode;
  role?: string;
  tabIndex?: number;
  crosshairs?: boolean;
  shape?: 'rounded' | 'rectangular' | 'circular';
};

export const Placeholder = forwardRef<HTMLDivElement, IPlaceholderProps>(
  function Placeholder(props, ref) {
    const {
      styles,
      sx,
      label,
      children,
      crosshairs,
      shape = 'rounded',
      ...other
    } = props;

    const { theme } = useComponentTheme('Placeholder');
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
        ref={ref}
        {...other}
      >
        {crosshairs ? <div {...sxf('guides')} /> : null}
        {label ? <div {...sxf('label')}>{label}</div> : null}
        {children}
      </div>
    );
  },
);
