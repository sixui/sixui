import type { MapNamespaces } from '@stylexjs/stylex/lib/StyleXTypes';
import * as stylex from '@stylexjs/stylex';

import type { IStyles } from '@/helpers/types';
import type { ITypographyStyleKey } from '@/components/atoms/Typography';
import { typescaleVars } from '../vars/typo.stylex';

type ITypographyStyles = IStyles<ITypographyStyleKey>;
export const styles: MapNamespaces<ITypographyStyles> =
  stylex.create<ITypographyStyles>({
    host: {
      margin: 0,
    },
    host$gutterBottom: {
      marginBottom: '0.35em',
    },
    display$lg: {
      fontFamily: typescaleVars.displayFont$lg,
      fontSize: typescaleVars.displaySize$lg,
      fontWeight: typescaleVars.displayWeight$lg,
      lineHeight: typescaleVars.displayLineHeight$lg,
      letterSpacing: typescaleVars.displayLetterSpacing$lg,
    },
    display$md: {
      fontFamily: typescaleVars.displayFont$md,
      fontSize: typescaleVars.displaySize$md,
      fontWeight: typescaleVars.displayWeight$md,
      lineHeight: typescaleVars.displayLineHeight$md,
      letterSpacing: typescaleVars.displayLetterSpacing$md,
    },
    display$sm: {
      fontFamily: typescaleVars.displayFont$sm,
      fontSize: typescaleVars.displaySize$sm,
      fontWeight: typescaleVars.displayWeight$sm,
      lineHeight: typescaleVars.displayLineHeight$sm,
      letterSpacing: typescaleVars.displayLetterSpacing$sm,
    },
    headline$lg: {
      fontFamily: typescaleVars.headlineFont$lg,
      fontSize: typescaleVars.headlineSize$lg,
      fontWeight: typescaleVars.headlineWeight$lg,
      lineHeight: typescaleVars.headlineLineHeight$lg,
      letterSpacing: typescaleVars.headlineLetterSpacing$lg,
    },
    headline$md: {
      fontFamily: typescaleVars.headlineFont$md,
      fontSize: typescaleVars.headlineSize$md,
      fontWeight: typescaleVars.headlineWeight$md,
      lineHeight: typescaleVars.headlineLineHeight$md,
      letterSpacing: typescaleVars.headlineLetterSpacing$md,
    },
    headline$sm: {
      fontFamily: typescaleVars.headlineFont$sm,
      fontSize: typescaleVars.headlineSize$sm,
      fontWeight: typescaleVars.headlineWeight$sm,
      lineHeight: typescaleVars.headlineLineHeight$sm,
      letterSpacing: typescaleVars.headlineLetterSpacing$sm,
    },
    title$lg: {
      fontFamily: typescaleVars.titleFont$lg,
      fontSize: typescaleVars.titleSize$lg,
      fontWeight: typescaleVars.titleWeight$lg,
      lineHeight: typescaleVars.titleLineHeight$lg,
      letterSpacing: typescaleVars.titleLetterSpacing$lg,
    },
    title$md: {
      fontFamily: typescaleVars.titleFont$md,
      fontSize: typescaleVars.titleSize$md,
      fontWeight: typescaleVars.titleWeight$md,
      lineHeight: typescaleVars.titleLineHeight$md,
      letterSpacing: typescaleVars.titleLetterSpacing$md,
    },
    title$sm: {
      fontFamily: typescaleVars.titleFont$sm,
      fontSize: typescaleVars.titleSize$sm,
      fontWeight: typescaleVars.titleWeight$sm,
      lineHeight: typescaleVars.titleLineHeight$sm,
      letterSpacing: typescaleVars.titleLetterSpacing$sm,
    },
    body$lg: {
      fontFamily: typescaleVars.bodyFont$lg,
      fontSize: typescaleVars.bodySize$lg,
      fontWeight: typescaleVars.bodyWeight$lg,
      lineHeight: typescaleVars.bodyLineHeight$lg,
      letterSpacing: typescaleVars.bodyLetterSpacing$lg,
    },
    body$md: {
      fontFamily: typescaleVars.bodyFont$md,
      fontSize: typescaleVars.bodySize$md,
      fontWeight: typescaleVars.bodyWeight$md,
      lineHeight: typescaleVars.bodyLineHeight$md,
      letterSpacing: typescaleVars.bodyLetterSpacing$md,
    },
    body$sm: {
      fontFamily: typescaleVars.bodyFont$sm,
      fontSize: typescaleVars.bodySize$sm,
      fontWeight: typescaleVars.bodyWeight$sm,
      lineHeight: typescaleVars.bodyLineHeight$sm,
      letterSpacing: typescaleVars.bodyLetterSpacing$sm,
    },
    label$lg: {
      fontFamily: typescaleVars.labelFont$lg,
      fontSize: typescaleVars.labelSize$lg,
      fontWeight: typescaleVars.labelWeight$lg,
      lineHeight: typescaleVars.labelLineHeight$lg,
      letterSpacing: typescaleVars.labelLetterSpacing$lg,
    },
    label$md: {
      fontFamily: typescaleVars.labelFont$md,
      fontSize: typescaleVars.labelSize$md,
      fontWeight: typescaleVars.labelWeight$md,
      lineHeight: typescaleVars.labelLineHeight$md,
      letterSpacing: typescaleVars.labelLetterSpacing$md,
    },
    label$sm: {
      fontFamily: typescaleVars.labelFont$sm,
      fontSize: typescaleVars.labelSize$sm,
      fontWeight: typescaleVars.labelWeight$sm,
      lineHeight: typescaleVars.labelLineHeight$sm,
      letterSpacing: typescaleVars.labelLetterSpacing$sm,
    },
  });
