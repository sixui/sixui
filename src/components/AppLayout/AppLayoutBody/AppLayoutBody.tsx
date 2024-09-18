import { forwardRef } from 'react';

import type { IAppLayoutBodyProps } from './AppLayoutBody.types';
import { Stack } from '~/components/Stack';
import { useStyles } from '~/hooks/useStyles';
import { useAppLayoutContext } from '../AppLayout.context';
import { appLayoutBodyStyles } from './AppLayoutBody.styles';

export const AppLayoutBody = forwardRef<HTMLDivElement, IAppLayoutBodyProps>(
  function AppLayoutBody(props, forwardedRef) {
    const { styles, sx, children, ...other } = props;
    const appLayoutContext = useAppLayoutContext();

    const { combineStyles, globalStyles } = useStyles({
      componentName: 'AppLayoutBody',
      styles: [appLayoutBodyStyles, styles],
    });

    const hasHeader = appLayoutContext.components.includes('header');
    const hasAside = appLayoutContext.components.includes('aside');

    return (
      <Stack
        as="main"
        align="start"
        horizontal
        {...other}
        sx={[
          globalStyles,
          combineStyles(
            'host',
            hasHeader && 'host$hasHeader',
            hasAside && 'host$hasAside',
          ),
          sx,
        ]}
        ref={forwardedRef}
      >
        {children}
      </Stack>
    );
  },
);
