import { forwardRef } from 'react';

import type { IAppShellFooterProps } from './AppShellFooter.types';
import { useStyles } from '~/hooks/useStyles';
import { Base } from '~/components/Base';
import { useAppShellContext } from '../AppShell.context';
import { appShellFooterStyles } from './AppShellFooter.styles';

export const AppShellFooter = forwardRef<HTMLDivElement, IAppShellFooterProps>(
  function AppShellFooter(props, forwardedRef) {
    const { styles, sx, children, ...other } = props;
    const appShellContext = useAppShellContext();

    const { combineStyles, globalStyles } = useStyles({
      name: 'AppShellFooter',
      styles: [appShellFooterStyles, styles],
    });

    return (
      <Base
        as='footer'
        {...other}
        sx={[globalStyles, combineStyles('host'), sx]}
        ref={forwardedRef}
      >
        {children}
      </Base>
    );
  },
);
