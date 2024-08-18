import { forwardRef } from 'react';

import type { IAppShellHeaderProps } from './AppShellHeader.types';
import { useStyles } from '~/hooks/useStyles';
import { Stack } from '~/components/Stack';
import { useAppShellContext } from '../AppShell.context';
import { appShellHeaderStyles } from './AppShellHeader.styles';

export const AppShellHeader = forwardRef<HTMLDivElement, IAppShellHeaderProps>(
  function AppShellHeader(props, forwardedRef) {
    const { styles, sx, children, ...other } = props;
    const appShellContext = useAppShellContext();

    const { combineStyles, globalStyles } = useStyles({
      name: 'AppShellHeader',
      styles: [appShellHeaderStyles, styles],
    });

    return (
      <Stack
        as='header'
        horizontal
        justify='space-between'
        {...other}
        sx={[globalStyles, combineStyles('host'), sx]}
        ref={forwardedRef}
      >
        {children}
      </Stack>
    );
  },
);
