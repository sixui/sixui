import { forwardRef } from 'react';

import type { IAppLayoutBodyProps } from './AppLayoutBody.types';
import { useStyles } from '~/hooks/useStyles';
import { Stack } from '~/components/Stack';
import { useAppLayoutContext } from '../AppLayout.context';
import { appLayoutBodyStyles } from './AppLayoutBody.styles';

export const AppLayoutBody = forwardRef<HTMLDivElement, IAppLayoutBodyProps>(
  function AppLayoutBody(props, forwardedRef) {
    const { styles, sx, children, ...other } = props;
    const appLayoutContext = useAppLayoutContext();

    const { combineStyles, globalStyles } = useStyles({
      name: 'AppLayoutBody',
      styles: [appLayoutBodyStyles, styles],
    });

    const hasHeader = appLayoutContext.components.includes('header');

    return (
      <Stack
        as='main'
        align='start'
        {...other}
        sx={[
          globalStyles,
          combineStyles('host', hasHeader && 'host$hasHeader'),
          sx,
        ]}
        ref={forwardedRef}
      >
        {children}
      </Stack>
    );
  },
);
