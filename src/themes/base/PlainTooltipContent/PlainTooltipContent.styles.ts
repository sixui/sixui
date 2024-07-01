import type { MapNamespaces } from '@stylexjs/stylex/lib/StyleXTypes';
import stylex from '@stylexjs/stylex';

import type { IStyles } from '@/helpers/types';
import type { IPlainTooltipContentStyleKey } from '@/components/atoms/PlainTooltipContent';
import { componentVars as vars } from './PlainTooltipContent.stylex';

type IPlainTooltipContentStyles = IStyles<IPlainTooltipContentStyleKey>;
export const styles: MapNamespaces<IPlainTooltipContentStyles> =
  stylex.create<IPlainTooltipContentStyles>({
    host: {
      display: 'flex',
      alignItems: 'center',
      width: 'max-content',
      borderRadius: vars.containerShape,
      backgroundColor: vars.containerColor,
      paddingTop: vars.topSpace,
      paddingBottom: vars.bottomSpace,
      paddingLeft: vars.leadingSpace,
      paddingRight: vars.trailingSpace,
      maxWidth: vars.containerMaxWidth,
      minHeight: vars.containerMinHeight,
    },
    supportingText: {
      color: vars.supportingTextColor,
      fontFamily: vars.supportingTextFont,
      fontSize: vars.supportingTextSize,
      fontWeight: vars.supportingTextWeight,
      lineHeight: vars.supportingTextLineHeight,
      letterSpacing: vars.supportingTextLetterSpacing,
    },
  });
