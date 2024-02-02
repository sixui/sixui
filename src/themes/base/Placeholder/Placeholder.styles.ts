import type { MapNamespaces } from '@stylexjs/stylex/lib/StyleXTypes';
import * as stylex from '@stylexjs/stylex';

import type { IStyles } from '@/helpers/types';
import type { IPlaceholderStyleKey } from '@/components/atoms/Placeholder';
import { componentVars as vars } from './Placeholder.stylex';

type IPlaceholderStyles = IStyles<IPlaceholderStyleKey>;
export const styles: MapNamespaces<IPlaceholderStyles> =
  stylex.create<IPlaceholderStyles>({
    host: {
      position: 'relative',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: vars.containerShape,
      backgroundColor: vars.containerColor,
      color: vars.labelTextColor,
      fontFamily: vars.labelTextFont,
      lineHeight: vars.labelTextLineHeight,
      fontWeight: vars.labelTextWeight,
    },
    guides: {
      overflow: 'hidden',
      borderRadius: 'inherit',
      position: 'absolute',
      inset: 0,
      '::before': {
        content: '',
        position: 'absolute',
        top: 0,
        borderTopWidth: '1px',
        borderTopStyle: 'solid',
        borderTopColor: vars.crosshairsColor,
        width: '150%',
        transformOrigin: 'top left',
        transform: 'rotate(45deg)',
      },
      '::after': {
        content: '',
        position: 'absolute',
        bottom: 0,
        borderBottomWidth: '1px',
        borderBottomStyle: 'solid',
        borderBottomColor: vars.crosshairsColor,
        width: '150%',
        transformOrigin: 'top left',
        transform: 'rotate(-45deg)',
      },
    },
    label: {
      padding: '0.5rem',
      fontFamily: vars.labelTextFont,
      fontSize: vars.labelTextSize,
      lineHeight: vars.labelTextLineHeight,
      letterSpacing: vars.labelTextLetterSpacing,
      fontWeight: vars.labelTextWeight,
      zIndex: 1,
    },
  });
