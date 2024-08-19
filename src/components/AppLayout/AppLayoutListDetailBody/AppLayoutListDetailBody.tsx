import { forwardRef } from 'react';

import type { IAppLayoutListDetailBodyProps } from './AppLayoutListDetailBody.types';
import { useStyles } from '~/hooks/useStyles';
import { Stack } from '~/components/Stack';
import { filterFalsyChildren } from '~/helpers/react/filterFalsyChildren';
import { isFunction } from '~/helpers/isFunction';
import { Base } from '~/components/Base';
import { useWindowSizeClass } from '~/hooks/useWindowSizeClass';
import { useAppLayoutContext } from '../AppLayout.context';
import { appShellListDetailBodyStyles } from './AppLayoutListDetailBody.styles';

export const AppLayoutListDetailBody = forwardRef<
  HTMLDivElement,
  IAppLayoutListDetailBodyProps
>(function AppLayoutListDetailBody(props, forwardedRef) {
  const { styles, sx, children, ...other } = props;
  const appShellContext = useAppLayoutContext();
  const windowSizeClass = useWindowSizeClass({
    window: appShellContext.window,
  });

  const { combineStyles, globalStyles } = useStyles({
    name: 'AppLayoutListDetailBody',
    styles: [appShellListDetailBodyStyles, styles],
  });

  const recommendedVisiblePanes = windowSizeClass?.mediumAndUp ? 2 : 1;

  return (
    <Base
      {...other}
      sx={[globalStyles, combineStyles('host'), sx]}
      ref={forwardedRef}
    >
      {isFunction(children) ? children({ recommendedVisiblePanes }) : children}
    </Base>
  );
});
