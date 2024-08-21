import { forwardRef } from 'react';
import { isFunction } from '~/helpers/isFunction';

import type { INavigationDrawerContentProps } from './NavigationDrawerContent.types';
import { useStyles } from '~/hooks/useStyles';
import { SideSheetContent } from '../SideSheetContent';
import { NavigationDrawerContentDestination } from './NavigationDrawerContentDestination';
import { navigationDrawerContentStyles } from './NavigationDrawerContent.styles';
import { navigationDrawerContentTheme } from './NavigationDrawerContent.stylex';
import { NavigationDrawerContentDivider } from './NavigationDrawerContentDivider';
import { NavigationDrawerContentDestinationList } from './NavigationDrawerContentDestinationList';
import { navigationDrawerContentVariantStyles } from './variants';

const NavigationDrawerContent = forwardRef<
  HTMLDivElement,
  INavigationDrawerContentProps
>(function NavigationDrawerContent(props, forwardedRef) {
  const {
    styles,
    sx,
    innerStyles,
    children,
    variant = 'standard',
    onClose,
    ...other
  } = props;

  const variantStyles = navigationDrawerContentVariantStyles[variant];
  const { combineStyles, getStyles, globalStyles } = useStyles({
    name: 'NavigationDrawerContent',
    styles: [navigationDrawerContentStyles, variantStyles, styles],
  });

  return (
    <SideSheetContent
      {...other}
      onClose={onClose}
      styles={innerStyles?.sideSheetContent}
      sx={[
        navigationDrawerContentTheme,
        globalStyles,
        combineStyles('host'),
        sx,
      ]}
      ref={forwardedRef}
    >
      <div {...getStyles('inner')}>
        {isFunction(children)
          ? children({ close: () => onClose?.() })
          : children}
      </div>
    </SideSheetContent>
  );
});

const NavigationDrawerContentNamespace = Object.assign(
  NavigationDrawerContent,
  {
    DestinationList: NavigationDrawerContentDestinationList,
    Destination: NavigationDrawerContentDestination,
    Divider: NavigationDrawerContentDivider,
  },
);

export { NavigationDrawerContentNamespace as NavigationDrawerContent };
