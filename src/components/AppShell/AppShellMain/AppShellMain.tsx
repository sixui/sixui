import { forwardRef } from 'react';

import type { IAppShellMainProps } from './AppShellMain.types';
import { useStyles } from '~/hooks/useStyles';
import { Base } from '~/components/Base';
import { appShellMainStyles } from './AppShellMain.styles';

export const AppShellMain = forwardRef<HTMLDivElement, IAppShellMainProps>(
  function AppShellMain(props, forwardedRef) {
    const { styles, sx, children, ...other } = props;

    const { combineStyles, globalStyles } = useStyles({
      name: 'AppShellMain',
      styles: [appShellMainStyles, styles],
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
