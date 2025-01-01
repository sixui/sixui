import { forwardRef } from 'react';

import type { INavigationDrawerContentProps } from './NavigationDrawerContent.types';
import { useStyles } from '~/hooks/useStyles';
import { NavigationDrawerContentDestination } from '../NavigationDrawerContentDestination';
import { NavigationDrawerContentDestinationList } from '../NavigationDrawerContentDestinationList';
import { NavigationDrawerContentDivider } from '../NavigationDrawerContentDivider';
import { SideSheetContent } from '../SideSheetContent';
import { navigationDrawerContentStyles } from './NavigationDrawerContent.styles';
import { navigationDrawerContentTheme } from './NavigationDrawerContent.stylex';
import { navigationDrawerContentVariantStyles } from './variants';

const NavigationDrawerContent = forwardRef<
  HTMLDivElement,
  INavigationDrawerContentProps
>(function NavigationDrawerContent(props, forwardedRef) {
  const {
    styles,
    sx,
    innerStyles,
    variant = 'standard',
    onClose,
    ...other
  } = props;

  const variantStyles = navigationDrawerContentVariantStyles[variant];
  const { combineStyles, globalStyles } = useStyles({
    componentName: 'NavigationDrawerContent',
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
    />
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
