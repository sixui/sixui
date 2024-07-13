import { forwardRef, useMemo } from 'react';

import type {
  IDividerStyleKey,
  IDividerStyleVarKey,
} from './Divider.styledefs';
import type { IDividerProps } from './DividerProps';
import { stylesCombinatorFactory } from '@/helpers/stylesCombinatorFactory';
import { stylePropsFactory } from '@/helpers/stylePropsFactory';
import { useComponentThemeOld } from '@/hooks/useComponentThemeOld';

// https://github.com/material-components/material-web/blob/main/divider/internal/divider.ts

export const Divider = forwardRef<HTMLDivElement, IDividerProps>(
  function Divider(props, forwardedRef) {
    const { styles, sx, inset, insetStart, insetEnd, children, ...other } =
      props;

    const { theme } = useComponentThemeOld('Divider');
    const stylesCombinator = useMemo(
      () => stylesCombinatorFactory(theme.styles, styles),
      [theme.styles, styles],
    );
    const sxf = useMemo(
      () =>
        stylePropsFactory<IDividerStyleKey, IDividerStyleVarKey>(
          stylesCombinator,
        ),
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
      <div {...sxf('host', theme.vars, sx)} ref={forwardedRef} {...other}>
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
