import { forwardRef } from 'react';

import type { IPlaceholderProps } from './Placeholder.types';
import { useStyles } from '~/hooks/useStyles';
import { Paper } from '../Paper';
import { placeholderStyles } from './Placeholder.styles';
import { placeholderTheme } from './Placeholder.stylex';

export const Placeholder = forwardRef<HTMLDivElement, IPlaceholderProps>(
  function Placeholder(props, forwardedRef) {
    const {
      innerStyles,
      styles,
      sx,
      label,
      children,
      crosshairs,
      disabled,
      ...other
    } = props;

    const { combineStyles, getStyles, globalStyles } = useStyles({
      name: 'Placeholder',
      styles: [placeholderStyles, styles],
    });

    return (
      <Paper
        innerStyles={innerStyles}
        {...other}
        sx={[
          placeholderTheme,
          globalStyles,
          combineStyles('host', disabled ? 'host$disabled' : null),
          sx,
        ]}
        ref={forwardedRef}
      >
        {crosshairs ? <div {...getStyles('crosshairs')} /> : null}
        {label ? <div {...getStyles('label')}>{label}</div> : null}
        {children}
      </Paper>
    );
  },
);
