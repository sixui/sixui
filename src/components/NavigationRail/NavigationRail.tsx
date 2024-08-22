import { forwardRef } from 'react';

import type { INavigationRailProps } from './NavigationRail.types';
import { useStyles } from '~/hooks/useStyles';
import { PaperBase } from '../PaperBase';
import { navigationRailStyles } from './NavigationRail.styles';
import { navigationRailTheme } from './NavigationRail.stylex';
import { NavigationRailDestination } from '../NavigationRailDestination';

const NavigationRail = forwardRef<HTMLDivElement, INavigationRailProps>(
  function NavigationRail(props, forwardedRef) {
    const {
      styles,
      sx,
      children,
      header,
      footer,
      groupAlignment = 'center',
      divider,
      ...other
    } = props;

    const { combineStyles, getStyles, globalStyles } = useStyles({
      name: 'NavigationRail',
      styles: [navigationRailStyles, styles],
    });

    return (
      <PaperBase
        {...other}
        sx={[
          globalStyles,
          navigationRailTheme,
          combineStyles('host', divider && 'host$divider'),
          sx,
        ]}
        ref={forwardedRef}
      >
        {header ? <div {...getStyles('header')}>{header}</div> : null}
        <div {...getStyles('group', `group$${groupAlignment}`)}>{children}</div>
        {footer ? <div {...getStyles('footer')}>{footer}</div> : null}
      </PaperBase>
    );
  },
);

const NavigationRailNamespace = Object.assign(NavigationRail, {
  Destination: NavigationRailDestination,
});

export { NavigationRailNamespace as NavigationRail };
