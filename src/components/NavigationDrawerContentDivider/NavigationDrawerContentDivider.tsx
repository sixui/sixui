import { forwardRef } from 'react';

import { useStyles } from '~/hooks/useStyles';
import { Divider, type IDividerProps } from '~/components/Divider';
import { navigationDrawerContentDividerStyles } from './NavigationDrawerContentDivider.styles';
import { navigationDrawerContentDividerTheme } from './NavigationDrawerContentDivider.stylex';

export const NavigationDrawerContentDivider = forwardRef<
  HTMLDivElement,
  IDividerProps
>(function NavigationDrawerContentDivider(props, forwardedRef) {
  const { styles, sx, ...other } = props;

  const { combineStyles, globalStyles } = useStyles({
    componentName: 'NavigationDrawerContentDivider',
    styles: [navigationDrawerContentDividerStyles, styles],
  });

  return (
    <Divider
      {...other}
      sx={[
        navigationDrawerContentDividerTheme,
        globalStyles,
        combineStyles('host'),
        sx,
      ]}
      ref={forwardedRef}
    />
  );
});
