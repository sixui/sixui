import { forwardRef } from 'react';

import type { INavigationRailProps } from './NavigationRail.types';
import { useStyles } from '~/hooks/useStyles';
import { Base } from '~/components/Base';
import { navigationRailStyles } from './NavigationRail.styles';

export const NavigationRail = forwardRef<HTMLDivElement, INavigationRailProps>(
  function NavigationRail(props, forwardedRef) {
    const { styles, sx, children, ...other } = props;

    const { combineStyles, globalStyles } = useStyles({
      name: 'NavigationRail',
      styles: [navigationRailStyles, styles],
    });

    return (
      <Base
        {...other}
        sx={[globalStyles, combineStyles('host'), sx]}
        ref={forwardedRef}
      >
        {children}
      </Base>
    );
  },
);
