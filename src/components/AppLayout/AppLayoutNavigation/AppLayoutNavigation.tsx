import { forwardRef } from 'react';

import type { IAppLayoutNavigationProps } from './AppLayoutNavigation.types';
import { useStyles } from '~/hooks/useStyles';
import { Base } from '~/components/Base';
import { useAppLayoutContext } from '../AppLayout.context';
import { appLayoutNavigationStyles } from './AppLayoutNavigation.styles';

export const AppLayoutNavigation = forwardRef<
  HTMLDivElement,
  IAppLayoutNavigationProps
>(function AppLayoutNavigation(props, forwardedRef) {
  const { styles, sx, children, ...other } = props;
  const appLayoutContext = useAppLayoutContext();

  const { combineStyles, getStyles, globalStyles } = useStyles({
    name: 'AppLayoutNavigation',
    styles: [appLayoutNavigationStyles, styles],
  });

  const isRail = appLayoutContext.canonicalLayout.navigationMode === 'rail';
  const isStandard =
    appLayoutContext.canonicalLayout.navigationMode === 'standard';

  return (
    <Base
      {...other}
      sx={[
        globalStyles,
        combineStyles(
          'host',
          isRail && 'host$rail',
          isStandard && 'host$standard',
        ),
        sx,
      ]}
      ref={forwardedRef}
    >
      <div {...getStyles('inner')}>{children}</div>
    </Base>
  );
});
