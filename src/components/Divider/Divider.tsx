import { forwardRef, useMemo } from 'react';

import type { IDividerProps } from './Divider.types';
import { stylesCombinatorFactory } from '@/helpers/stylesCombinatorFactory';
import { stylePropsFactory } from '@/helpers/stylePropsFactory';
import { useComponentTheme } from '@/hooks/useComponentTheme';
import { dividerStyles } from './Divider.styles';
import { dividerTheme } from './Divider.stylex';

// https://github.com/material-components/material-web/blob/main/divider/internal/divider.ts

export const Divider = forwardRef<HTMLDivElement, IDividerProps>(
  function Divider(props, forwardedRef) {
    const { styles, sx, inset, insetStart, insetEnd, children, ...other } =
      props;

    const componentTheme = useComponentTheme('Divider');
    const stylesCombinator = useMemo(
      () => stylesCombinatorFactory(dividerStyles, styles),
      [styles],
    );
    const sxf = useMemo(
      () => stylePropsFactory(stylesCombinator),
      [stylesCombinator],
    );

    const renderLine = (): React.ReactElement => (
      <div
        {...sxf(
          'line',
          inset && 'line$inset',
          insetStart && 'line$insetStart',
          insetEnd && 'line$insetEnd',
        )}
      />
    );

    return (
      <div
        {...sxf(dividerTheme, componentTheme.overridenStyles, 'host', sx)}
        ref={forwardedRef}
        {...other}
      >
        {children ? (
          <>
            {renderLine()}
            <div {...sxf('textContainer')}>
              <div {...sxf('text')}>{children}</div>
            </div>
            {renderLine()}
          </>
        ) : (
          renderLine()
        )}
      </div>
    );
  },
);
