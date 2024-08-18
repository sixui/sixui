import { forwardRef } from 'react';

import type { IAppLayoutPaneProps } from './AppLayoutPane.types';
import { useStyles } from '~/hooks/useStyles';
import { Stack } from '~/components/Stack';
import { useAppLayoutContext } from '../AppLayout.context';
import { appShellPaneStyles } from './AppLayoutPane.styles';

export const AppLayoutPane = forwardRef<HTMLDivElement, IAppLayoutPaneProps>(
  function AppLayoutPane(props, forwardedRef) {
    const { styles, sx, children, ...other } = props;
    const appShellContext = useAppLayoutContext();

    const { combineStyles, globalStyles } = useStyles({
      name: 'AppLayoutPane',
      styles: [appShellPaneStyles, styles],
    });

    return (
      <Stack
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
