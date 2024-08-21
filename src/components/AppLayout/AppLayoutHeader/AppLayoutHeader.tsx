import { forwardRef } from 'react';

import type { IAppLayoutHeaderProps } from './AppLayoutHeader.types';
import { useStyles } from '~/hooks/useStyles';
import { Stack } from '~/components/Stack';
import { useAppLayoutContext } from '../AppLayout.context';
import { appLayoutHeaderStyles } from './AppLayoutHeader.styles';

export const AppLayoutHeader = forwardRef<
  HTMLDivElement,
  IAppLayoutHeaderProps
>(function AppLayoutHeader(props, forwardedRef) {
  const { styles, sx, children, ...other } = props;
  const appLayoutContext = useAppLayoutContext();

  const { combineStyles, globalStyles } = useStyles({
    name: 'AppLayoutHeader',
    styles: [appLayoutHeaderStyles, styles],
  });

  const hasHeader = appLayoutContext.components.includes('header');
  const hasHeaderOpened = hasHeader;
  if (!hasHeaderOpened) {
    return null;
  }

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
});
