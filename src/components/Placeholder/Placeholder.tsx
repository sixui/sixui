import { forwardRef } from 'react';

import type { IPlaceholderProps } from './Placeholder.types';
import { useStyles } from '~/hooks/useStyles';
import { Paper } from '../Paper';
import { placeholderStyles } from './Placeholder.styles';
import { placeholderTheme } from './Placeholder.stylex';
import { commonStyles } from '~/helpers/commonStyles';
import { sizeToString } from '~/helpers/sizeToString';

export const Placeholder = forwardRef<HTMLDivElement, IPlaceholderProps>(
  function Placeholder(props, forwardedRef) {
    const {
      innerStyles,
      styles,
      sx,
      surface = 'surfaceContainerHighest',
      corner = 'sm',
      label,
      children,
      crosshairs,
      disabled,
      width,
      height,
      ...other
    } = props;

    const { combineStyles, getStyles, globalStyles } = useStyles({
      componentName: 'Placeholder',
      styles: [placeholderStyles, styles],
    });
    const widthAsString = width !== undefined ? sizeToString(width) : undefined;
    const heightAsString =
      height !== undefined ? sizeToString(height) : undefined;

    return (
      <Paper
        innerStyles={innerStyles}
        {...other}
        surface={surface}
        corner={corner}
        sx={[
          placeholderTheme,
          globalStyles,
          combineStyles(
            'host',
            widthAsString !== undefined && commonStyles.width(widthAsString),
            heightAsString !== undefined && commonStyles.height(heightAsString),
            disabled ? 'host$disabled' : null,
          ),
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
