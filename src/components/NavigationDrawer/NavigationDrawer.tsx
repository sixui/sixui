import { forwardRef } from 'react';

import type { INavigationDrawerProps } from './NavigationDrawer.types';
import { useStyles } from '~/hooks/useStyles';
import { Base } from '~/components/Base';
import { navigationDrawerStyles } from './NavigationDrawer.styles';
import { navigationDrawerTheme } from './NavigationDrawer.stylex';
import { navigationDrawerVariantStyles } from './variants';

export const NavigationDrawer = forwardRef<
  HTMLDivElement,
  INavigationDrawerProps
>(function NavigationDrawer(props, forwardedRef) {
  const { styles, sx, children, variant = 'standard', ...other } = props;

  const variantStyles = navigationDrawerVariantStyles[variant];
  const { combineStyles, globalStyles } = useStyles({
    name: 'NavigationDrawer',
    styles: [navigationDrawerStyles, variantStyles, styles],
  });

  return (
    <Base
      {...other}
      sx={[navigationDrawerTheme, globalStyles, combineStyles('host'), sx]}
      ref={forwardedRef}
    >
      {children}
    </Base>
  );
});
