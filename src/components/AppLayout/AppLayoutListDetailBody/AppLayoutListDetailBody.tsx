import { forwardRef } from 'react';

import type { IAppLayoutListDetailBodyProps } from './AppLayoutListDetailBody.types';
import { useStyles } from '~/hooks/useStyles';
import { Stack } from '~/components/Stack';
import { filterFalsyChildren } from '~/helpers/react/filterFalsyChildren';
import { isFunction } from '~/helpers/isFunction';
import { Base } from '~/components/Base';
import { useWindowSizeClass } from '~/hooks/useWindowSizeClass';
import { useAppLayoutContext } from '../AppLayout.context';
import { appLayoutListDetailBodyStyles } from './AppLayoutListDetailBody.styles';

export const AppLayoutListDetailBody = forwardRef<
  HTMLDivElement,
  IAppLayoutListDetailBodyProps
>(function AppLayoutListDetailBody(props, forwardedRef) {
  const { styles, sx, children, ...other } = props;
  const appLayoutContext = useAppLayoutContext();
  const windowSizeClass = useWindowSizeClass({
    window: appLayoutContext.window,
  });

  const { combineStyles, globalStyles } = useStyles({
    name: 'AppLayoutListDetailBody',
    styles: [appLayoutListDetailBodyStyles, styles],
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
