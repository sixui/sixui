import type { MapNamespaces } from '@stylexjs/stylex/lib/StyleXTypes';
import stylex from '@stylexjs/stylex';

import type { IStyles } from '@/helpers/types';
import type { IBreadcrumbsStyleKey } from '@/components/atoms/Breadcrumbs';
import type { IButtonStyleKey } from '@/components/atoms/Button';
import type { IFocusRingStyleKey } from '@/components/utils/FocusRing';
import { componentVars as vars } from './Breadcrumbs.stylex';
import { componentVars as focusRingVars } from '../FocusRing/FocusRing.stylex';

type IBreadcrumbsStyles = IStyles<IBreadcrumbsStyleKey>;
export const styles: MapNamespaces<IBreadcrumbsStyles> =
  stylex.create<IBreadcrumbsStyles>({
    host: {
      display: 'flex',
      flexWrap: 'wrap',
      alignItems: 'center',
      padding: 0,
      margin: 0,
      listStyle: 'none',
      gap: 8,
    },
    item: {
      color: vars.itemColor,
    },
    separator: {
      color: vars.separatorColor,
      display: 'flex',
      userSelect: 'none',
      fontSize: vars.separatorSize,
    },
    icon: {
      width: 24,
      height: 16,
    },
  });

type IButtonStyles = IStyles<IButtonStyleKey>;
export const expandButtonStyles: MapNamespaces<IButtonStyles> = stylex.create<
  IStyles<IButtonStyleKey>
>({
  host: {
    display: 'flex',
    borderStyle: 'unset',
    outline: 'none',
    marginLeft: vars.expandButtonLeadingSpace,
    marginRight: vars.expandButtonTrailingSpace,
    color: {
      default: vars.expandButtonLabelTextColor,
      ':is([data-focused])': vars.expandButtonLabelTextColor$focus,
      ':is([data-hovered])': vars.expandButtonLabelTextColor$hover,
      ':is([data-pressed])': vars.expandButtonLabelTextColor$pressed,
    },
    cursor: 'pointer',
    backgroundColor: vars.expandButtonContainerColor,
    borderRadius: vars.expandButtonContainerShape,
    width: vars.expandButtonContainerWidth,
    height: vars.expandButtonContainerHeight,
  },
});

type IFocusRingStyles = IStyles<IFocusRingStyleKey>;
export const expandButtonFocusRingStyles: MapNamespaces<IFocusRingStyles> =
  stylex.create<IStyles<IFocusRingStyleKey>>({
    host: {
      // eslint-disable-next-line @stylexjs/valid-styles
      [focusRingVars.shape]: vars.expandButtonContainerShape,
    },
  });
