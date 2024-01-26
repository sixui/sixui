import React from 'react';

import type { IContainer } from '@/helpers/Container';
import type {
  IPlaceholderStyleKey,
  IPlaceholderStyleVarKey,
} from './Placeholder.styledefs';
import { stylesCombinatorFactory } from '@/helpers/stylesCombinatorFactory';
import { stylePropsFactory } from '@/helpers/stylePropsFactory';
import { useComponentTheme } from '@/hooks/useComponentTheme';

export interface IPlaceholderProps
  extends IContainer<IPlaceholderStyleKey, IPlaceholderStyleVarKey> {
  label?: string;
  children?: React.ReactNode;
  role?: string;
  tabIndex?: number;
  crosshairs?: boolean;
}

export const Placeholder: React.FC<IPlaceholderProps> = ({
  label,
  children,
  role,
  tabIndex,
  crosshairs,
  ...props
}) => {
  const { theme, styles } = useComponentTheme('Placeholder');

  const styleProps = React.useMemo(
    () =>
      stylePropsFactory<IPlaceholderStyleKey>(
        stylesCombinatorFactory(styles, props.styles),
      ),
    [styles, props.styles],
  );

  return (
    <div
      {...styleProps(['host'], [theme, props.theme])}
      role={role}
      tabIndex={tabIndex}
    >
      {crosshairs ? <div {...styleProps(['guides'])} /> : null}
      {label ? <div {...styleProps(['label'])}>{label}</div> : null}
      {children}
    </div>
  );
};
