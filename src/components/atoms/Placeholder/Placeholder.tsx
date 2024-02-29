import * as React from 'react';

import type { IContainer } from '@/helpers/Container';
import type {
  IPlaceholderStyleKey,
  IPlaceholderStyleVarKey,
} from './Placeholder.styledefs';
import { stylesCombinatorFactory } from '@/helpers/stylesCombinatorFactory';
import { stylePropsFactory } from '@/helpers/stylePropsFactory';
import { useComponentTheme } from '@/hooks/useComponentTheme';

export type IPlaceholderProps = IContainer<
  IPlaceholderStyleKey,
  IPlaceholderStyleVarKey
> & {
  label?: string;
  children?: React.ReactNode;
  role?: string;
  tabIndex?: number;
  crosshairs?: boolean;
  shape?: 'rounded' | 'rectangular' | 'circular';
};

export const Placeholder: React.FC<IPlaceholderProps> = ({
  label,
  children,
  role,
  tabIndex,
  crosshairs,
  shape = 'rounded',
  ...props
}) => {
  const theme = useComponentTheme('Placeholder');

  const styleProps = React.useMemo(
    () =>
      stylePropsFactory<IPlaceholderStyleKey>(
        stylesCombinatorFactory(theme.styles, props.styles),
        props.visualState,
      ),
    [theme.styles, props.styles, props.visualState],
  );

  return (
    <div
      {...styleProps(
        [
          'host',
          shape === 'rectangular'
            ? 'host$rectangular'
            : shape === 'circular'
              ? 'host$circular'
              : null,
          props.sx,
        ],
        [theme.vars, props.theme],
      )}
      role={role}
      tabIndex={tabIndex}
    >
      {crosshairs ? <div {...styleProps(['guides'])} /> : null}
      {label ? <div {...styleProps(['label'])}>{label}</div> : null}
      {children}
    </div>
  );
};
