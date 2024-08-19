import { forwardRef } from 'react';

import type { INavigationRailProps } from './NavigationRail.types';
import { useStyles } from '~/hooks/useStyles';
import { PaperBase } from '../PaperBase';
import { navigationRailStyles } from './NavigationRail.styles';
import { navigationRailTheme } from './NavigationRail.stylex';

export const NavigationRail = forwardRef<HTMLDivElement, INavigationRailProps>(
  function NavigationRail(props, forwardedRef) {
    const {
      styles,
      sx,
      children,
      leading,
      trailing,
      groupAlignment = 'center',
      ...other
    } = props;

    const { combineStyles, getStyles, globalStyles } = useStyles({
      name: 'NavigationRail',
      styles: [navigationRailStyles, styles],
    });

    return (
      <PaperBase
        {...other}
        sx={[globalStyles, navigationRailTheme, combineStyles('host'), sx]}
        ref={forwardedRef}
      >
        {leading}
        <div {...getStyles('group', `group$${groupAlignment}`)}>{children}</div>
        {trailing}
      </PaperBase>
    );
  },
);
