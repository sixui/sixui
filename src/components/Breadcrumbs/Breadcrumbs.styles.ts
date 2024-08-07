import stylex from '@stylexjs/stylex';

import { focusRingTokens } from '../FocusRing/FocusRing.stylex';
import { spacingTokens } from '~/themes/base/spacing.stylex';
import { densityTokens } from '~/themes/base/density.stylex';
import { scaleTokens } from '~/themes/base/scale.stylex';
import { breadcrumbsTokens } from './Breadcrumbs.stylex';

const MIN_DENSITY = -1;
const MAX_DENSITY = 0;
const DENSITY = `${densityTokens.interval} * clamp(${MIN_DENSITY}, ${densityTokens.density}, ${MAX_DENSITY}) * ${scaleTokens.scale}`;

export type IBreadcrumbsStylesKey = keyof typeof breadcrumbsStyles;
export const breadcrumbsStyles = stylex.create({
  host: {
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'center',
    padding: 0,
    margin: 0,
    listStyle: 'none',
    gap: spacingTokens.padding$2,
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
    fontSize: `calc(18px * ${scaleTokens.scale})`,
    inlineSize: `calc(18px * ${scaleTokens.scale})`,
    blockSize: `calc(18px * ${scaleTokens.scale})`,
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
    borderRadius: `calc(${breadcrumbsTokens.expandButtonContainerShape} * ${scaleTokens.scale})`,
    width: `calc(${breadcrumbsTokens.expandButtonContainerWidth} * ${scaleTokens.scale})`,
    height: `calc(${breadcrumbsTokens.expandButtonContainerHeight} * ${scaleTokens.scale} + ${DENSITY})`,
  },
});

export const breadcrumbsExpandButtonFocusRingStyles = stylex.create({
  host: {
    [focusRingTokens.shape]: `calc(${breadcrumbsTokens.expandButtonContainerShape} * ${scaleTokens.scale})`,
  },
});
