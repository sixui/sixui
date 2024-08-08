import { forwardRef } from 'react';

import type { IDividerProps } from './Divider.types';
import { dividerStyles } from './Divider.styles';
import { dividerTheme } from './Divider.stylex';
import { Base } from '../Base';
import { useStyles } from '~/hooks/useStyles';

// https://github.com/material-components/material-web/blob/main/divider/internal/divider.ts

export const Divider = forwardRef<HTMLDivElement, IDividerProps>(
  function Divider(props, forwardedRef) {
    const {
      styles,
      sx,
      orientation = 'horizontal',
      inset,
      insetStart,
      insetEnd,
      children,
      ...other
    } = props;

    const { combineStyles, getStyles, globalStyles } = useStyles({
      name: 'Divider',
      styles: [dividerStyles, styles],
    });

    const renderLine = (): React.ReactElement => (
      <div
        {...getStyles(
          'line',
          `line$${orientation}`,
          (inset || insetStart) && `line$${orientation}$insetStart`,
          (inset || insetEnd) && `line$${orientation}$insetEnd`,
        )}
      />
    );

    return (
      <Base
        {...other}
        sx={[
          dividerTheme,
          globalStyles,
          combineStyles('host', `host$${orientation}`),
          sx,
        ]}
        ref={forwardedRef}
      >
        {children ? (
          <>
            {renderLine()}
            <div {...getStyles(`textContainer$${orientation}`)}>
              <div {...getStyles('text')}>{children}</div>
            </div>
            {renderLine()}
          </>
        ) : (
          renderLine()
        )}
      </Base>
    );
  },
);
