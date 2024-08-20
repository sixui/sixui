import { forwardRef } from 'react';
import { asArray } from '@olivierpascal/helpers';

import type { IAppLayoutNavigationRailProps } from './AppLayoutNavigationRail.types';
import { useStyles } from '~/hooks/useStyles';
import { useAppLayoutContext } from '../AppLayout.context';
import {
  appLayoutNavigationRailStyles,
  type IAppLayoutNavigationRailStylesKey,
} from './AppLayoutNavigationRail.styles';
import {
  NavigationRail,
  type INavigationRailStylesKey,
} from '~/components/NavigationRail';

export const AppLayoutNavigationRail = forwardRef<
  HTMLDivElement,
  IAppLayoutNavigationRailProps
>(function AppLayoutNavigationRail(props, forwardedRef) {
  const { styles, sx, ...other } = props;
  const appLayoutContext = useAppLayoutContext();

  const { combineStyles, globalStyles } = useStyles<
    INavigationRailStylesKey | IAppLayoutNavigationRailStylesKey
  >({
    name: 'AppLayoutNavigationRail',
    styles: [appLayoutNavigationRailStyles, styles],
  });

  if (appLayoutContext.canonicalLayout.navigationMode !== 'rail') {
    return null;
  }

  return (
    <NavigationRail
      {...other}
      styles={[appLayoutNavigationRailStyles, ...asArray(styles)]}
      sx={[
        globalStyles,
        appLayoutContext.navigationRail?.fullHeight &&
          combineStyles('host$fullHeight'),
        sx,
      ]}
      ref={forwardedRef}
    />
  );
});
