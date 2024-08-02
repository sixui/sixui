import { forwardRef, useMemo } from 'react';

import type { IPlaceholderProps } from './Placeholder.types';
import { stylesCombinatorFactory } from '~/helpers/stylesCombinatorFactory';
import { stylePropsFactory } from '~/helpers/stylePropsFactory';
import { useComponentTheme } from '~/hooks/useComponentTheme';
import { Paper } from '~/components/Paper';
import { placeholderStyles } from './Placeholder.styles';
import { placeholderTheme } from './Placeholder.stylex';

export const Placeholder = forwardRef<HTMLDivElement, IPlaceholderProps>(
  function Placeholder(props, forwardedRef) {
    const { innerStyles, styles, sx, children, crosshairs, ...other } = props;

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
      <Paper
        sx={[
          placeholderTheme,
          componentTheme.overridenStyles,
          stylesCombinator('host'),
          sx,
        ]}
        ref={forwardedRef}
        innerStyles={innerStyles}
        {...other}
      >
        {crosshairs ? <div {...sxf('crosshairs')} /> : null}
        {children ? <div {...sxf('label')}>{children}</div> : null}
      </Paper>
    );
  },
);
