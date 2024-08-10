import stylex from '@stylexjs/stylex';

import { focusRingTokens } from '../FocusRing/FocusRing.stylex';
import { breadcrumbsTokens } from './Breadcrumbs.stylex';

export type IBreadcrumbsStylesKey = keyof typeof breadcrumbsStyles;
export const breadcrumbsStyles = stylex.create({
  host: {
    listStyle: 'none',
  },
  item: {
    color: breadcrumbsTokens.itemColor,
  },
  separator: {
    color: breadcrumbsTokens.separatorColor,
    display: 'flex',
    userSelect: 'none',
    fontSize: breadcrumbsTokens.separatorSize,
  },
  icon: {
    fontSize: breadcrumbsTokens.expandButtonIconSize,
    inlineSize: breadcrumbsTokens.expandButtonIconSize,
    blockSize: breadcrumbsTokens.expandButtonIconSize,
  },
  expandButton: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderStyle: 'unset',
    outline: 'none',
    marginLeft: breadcrumbsTokens.expandButtonLeadingSpace,
    marginRight: breadcrumbsTokens.expandButtonTrailingSpace,
    color: {
      default: breadcrumbsTokens.expandButtonLabelTextColor,
      ':is([data-focused])': breadcrumbsTokens.expandButtonLabelTextColor$focus,
      ':is([data-hovered])': breadcrumbsTokens.expandButtonLabelTextColor$hover,
      ':is([data-pressed])':
        breadcrumbsTokens.expandButtonLabelTextColor$pressed,
    },
    cursor: 'pointer',
    backgroundColor: breadcrumbsTokens.expandButtonContainerColor,
    borderRadius: breadcrumbsTokens.expandButtonContainerShape,
    width: breadcrumbsTokens.expandButtonContainerWidth,
    height: breadcrumbsTokens.expandButtonContainerHeight,
  },
});

export const breadcrumbsExpandButtonFocusRingStyles = stylex.create({
  host: {
    [focusRingTokens.shape]: breadcrumbsTokens.expandButtonContainerShape,
  },
});
