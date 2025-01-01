import { forwardRef } from 'react';
import { asArray } from '@olivierpascal/helpers';

import type { INavigationDrawerContentDestinationProps } from './NavigationDrawerContentDestination.types';
import { useStyles } from '~/hooks/useStyles';
import { ListItem } from '../ListItem';
import {
  navigationDrawerContentDestinationItemStyles,
  navigationDrawerContentDestinationStyles,
} from './NavigationDrawerContentDestination.styles';
import { navigationDrawerContentDestinationTheme } from './NavigationDrawerContentDestination.stylex';

export const NavigationDrawerContentDestination = forwardRef<
  HTMLButtonElement,
  INavigationDrawerContentDestinationProps
>(function NavigationDrawerContentDestination(props, forwardedRef) {
  const { styles, sx, innerStyles, children, active, ...other } = props;

  const { combineStyles, globalStyles } = useStyles({
    componentName: 'NavigationDrawerContentDestination',
    styles: [navigationDrawerContentDestinationStyles, styles],
  });

  return (
    <ListItem
      {...other}
      sx={[
        navigationDrawerContentDestinationTheme,
        globalStyles,
        combineStyles('host'),
        sx,
      ]}
      ref={forwardedRef}
      selected={active}
      innerStyles={{
        ...innerStyles,
        item: [
          navigationDrawerContentDestinationItemStyles,
          ...asArray(innerStyles?.item),
        ],
      }}
    >
      {children}
    </ListItem>
  );
});
