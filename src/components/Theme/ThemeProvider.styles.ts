import stylex from '@stylexjs/stylex';

import type { IColorScheme } from '~/themes/base/colorScheme.types';
import type {
  IMotionTheme,
  IShapeTheme,
  IStateTheme,
  ITypeFaceTheme,
  ITypeScaleTheme,
  IZIndexTheme,
} from '~/themes/base';
import { colorSchemeTokens } from '~/themes/base/colorScheme.stylex';
import { shapeTokens } from '~/themes/base/shape.stylex';
import { motionTokens } from '~/themes/base/motion.stylex';
import { typeFaceTokens } from '~/themes/base/typeFace.stylex';
import { typeScaleTokens } from '~/themes/base/typeScale.stylex';
import { stateTokens } from '~/themes/base/state.stylex';
import { zIndexTokens } from '~/themes/base/zIndex.stylex';

export const themeProviderStyles = stylex.create({
  wrapper: {
    scrollbarWidth: 'thin',
    fontFamily: typeScaleTokens.bodyFont$md,
    fontSize: typeScaleTokens.bodySize$md,
    fontWeight: typeScaleTokens.bodyWeight$md,
    lineHeight: typeScaleTokens.bodyLineHeight$md,
    letterSpacing: typeScaleTokens.bodyLetterSpacing$md,
  },
  dynamicScheme: (roles: IColorScheme) => ({
    [colorSchemeTokens.primary]: roles.primary,
    [colorSchemeTokens.onPrimary]: roles.onPrimary,
    [colorSchemeTokens.primaryContainer]: roles.primaryContainer,
    [colorSchemeTokens.onPrimaryContainer]: roles.onPrimaryContainer,

    [colorSchemeTokens.secondary]: roles.secondary,
    [colorSchemeTokens.onSecondary]: roles.onSecondary,
    [colorSchemeTokens.secondaryContainer]: roles.secondaryContainer,
    [colorSchemeTokens.onSecondaryContainer]: roles.onSecondaryContainer,

    [colorSchemeTokens.tertiary]: roles.tertiary,
    [colorSchemeTokens.onTertiary]: roles.onTertiary,
    [colorSchemeTokens.tertiaryContainer]: roles.tertiaryContainer,
    [colorSchemeTokens.onTertiaryContainer]: roles.onTertiaryContainer,

    [colorSchemeTokens.error]: roles.error,
    [colorSchemeTokens.onError]: roles.onError,
    [colorSchemeTokens.errorContainer]: roles.errorContainer,
    [colorSchemeTokens.onErrorContainer]: roles.onErrorContainer,

    [colorSchemeTokens.inverseSurface]: roles.inverseSurface,
    [colorSchemeTokens.inverseOnSurface]: roles.inverseOnSurface,
    [colorSchemeTokens.inversePrimary]: roles.inversePrimary,

    [colorSchemeTokens.surface]: roles.surface,
    [colorSchemeTokens.onSurface]: roles.onSurface,
    [colorSchemeTokens.onSurfaceVariant]: roles.onSurfaceVariant,
    [colorSchemeTokens.surfaceContainerLowest]: roles.surfaceContainerLowest,
    [colorSchemeTokens.surfaceContainerLow]: roles.surfaceContainerLow,
    [colorSchemeTokens.surfaceContainer]: roles.surfaceContainer,
    [colorSchemeTokens.surfaceContainerHigh]: roles.surfaceContainerHigh,
    [colorSchemeTokens.surfaceContainerHighest]: roles.surfaceContainerHighest,

    [colorSchemeTokens.outline]: roles.outline,
    [colorSchemeTokens.outlineVariant]: roles.outlineVariant,

    [colorSchemeTokens.primaryFixed]: roles.primaryFixed,
    [colorSchemeTokens.secondaryFixed]: roles.secondaryFixed,
    [colorSchemeTokens.tertiaryFixed]: roles.tertiaryFixed,

    [colorSchemeTokens.primaryFixedDim]: roles.primaryFixedDim,
    [colorSchemeTokens.secondaryFixedDim]: roles.secondaryFixedDim,
    [colorSchemeTokens.tertiaryFixedDim]: roles.tertiaryFixedDim,

    [colorSchemeTokens.onPrimaryFixed]: roles.onPrimaryFixed,
    [colorSchemeTokens.onSecondaryFixed]: roles.onSecondaryFixed,
    [colorSchemeTokens.onTertiaryFixed]: roles.onTertiaryFixed,

    [colorSchemeTokens.onPrimaryFixedVariant]: roles.onPrimaryFixedVariant,
    [colorSchemeTokens.onSecondaryFixedVariant]: roles.onSecondaryFixedVariant,
    [colorSchemeTokens.onTertiaryFixedVariant]: roles.onTertiaryFixedVariant,

    [colorSchemeTokens.surfaceDim]: roles.surfaceDim,
    [colorSchemeTokens.surfaceBright]: roles.surfaceBright,

    [colorSchemeTokens.shadow]: roles.shadow,
    [colorSchemeTokens.scrim]: roles.scrim,
  }),
  dynamicShape: (shape: IShapeTheme) => ({
    [shapeTokens.corner$full]: shape.corner$full,
    [shapeTokens.corner$xl]: shape.corner$xl,
    [shapeTokens.cornerTop$xl]: shape.cornerTop$xl,
    [shapeTokens.corner$lg]: shape.corner$lg,
    [shapeTokens.cornerStart$lg]: shape.cornerStart$lg,
    [shapeTokens.cornerEnd$lg]: shape.cornerEnd$lg,
    [shapeTokens.cornerTop$lg]: shape.cornerTop$lg,
    [shapeTokens.corner$md]: shape.corner$md,
    [shapeTokens.corner$sm]: shape.corner$sm,
    [shapeTokens.corner$xs]: shape.corner$xs,
    [shapeTokens.cornerTop$xs]: shape.cornerTop$xs,
    [shapeTokens.corner$none]: shape.corner$none,
  }),
  dynamicMotion: (motion: IMotionTheme) => ({
    [motionTokens.duration$extraLong1]: motion.duration$extraLong1,
    [motionTokens.duration$extraLong2]: motion.duration$extraLong2,
    [motionTokens.duration$extraLong3]: motion.duration$extraLong3,
    [motionTokens.duration$extraLong4]: motion.duration$extraLong4,
    [motionTokens.duration$long1]: motion.duration$long1,
    [motionTokens.duration$long2]: motion.duration$long2,
    [motionTokens.duration$long3]: motion.duration$long3,
    [motionTokens.duration$long4]: motion.duration$long4,
    [motionTokens.duration$medium1]: motion.duration$medium1,
    [motionTokens.duration$medium2]: motion.duration$medium2,
    [motionTokens.duration$medium3]: motion.duration$medium3,
    [motionTokens.duration$medium4]: motion.duration$medium4,
    [motionTokens.duration$short1]: motion.duration$short1,
    [motionTokens.duration$short2]: motion.duration$short2,
    [motionTokens.duration$short3]: motion.duration$short3,
    [motionTokens.duration$short4]: motion.duration$short4,
    [motionTokens.easing$emphasized]: motion.easing$emphasized,
    [motionTokens.easing$emphasizedAccelerate]:
      motion.easing$emphasizedAccelerate,
    [motionTokens.easing$emphasizedDecelerate]:
      motion.easing$emphasizedDecelerate,
    [motionTokens.easing$linear]: motion.easing$linear,
    [motionTokens.easing$standard]: motion.easing$standard,
    [motionTokens.easing$standardAccelerate]: motion.easing$standardAccelerate,
    [motionTokens.easing$standardDecelerate]: motion.easing$standardDecelerate,
  }),
  dynamicTypeFace: (typeFace: ITypeFaceTheme) => ({
    [typeFaceTokens.brand]: typeFace.brand,
    [typeFaceTokens.plain]: typeFace.plain,
    [typeFaceTokens.weightBold]: typeFace.weightBold,
    [typeFaceTokens.weightMedium]: typeFace.weightMedium,
    [typeFaceTokens.weightRegular]: typeFace.weightRegular,
  }),
  dynamicTypeScale: (typeScale: ITypeScaleTheme) => ({
    [typeScaleTokens.displayFont$lg]: typeScale.displayFont$lg,
    [typeScaleTokens.displayLineHeight$lg]: typeScale.displayLineHeight$lg,
    [typeScaleTokens.displaySize$lg]: typeScale.displaySize$lg,
    [typeScaleTokens.displayLetterSpacing$lg]:
      typeScale.displayLetterSpacing$lg,
    [typeScaleTokens.displayWeight$lg]: typeScale.displayWeight$lg,

    [typeScaleTokens.displayFont$md]: typeScale.displayFont$md,
    [typeScaleTokens.displayLineHeight$md]: typeScale.displayLineHeight$md,
    [typeScaleTokens.displaySize$md]: typeScale.displaySize$md,
    [typeScaleTokens.displayLetterSpacing$md]:
      typeScale.displayLetterSpacing$md,
    [typeScaleTokens.displayWeight$md]: typeScale.displayWeight$md,

    [typeScaleTokens.displayFont$sm]: typeScale.displayFont$sm,
    [typeScaleTokens.displayLineHeight$sm]: typeScale.displayLineHeight$sm,
    [typeScaleTokens.displaySize$sm]: typeScale.displaySize$sm,
    [typeScaleTokens.displayLetterSpacing$sm]:
      typeScale.displayLetterSpacing$sm,
    [typeScaleTokens.displayWeight$sm]: typeScale.displayWeight$sm,

    [typeScaleTokens.headlineFont$lg]: typeScale.headlineFont$lg,
    [typeScaleTokens.headlineLineHeight$lg]: typeScale.headlineLineHeight$lg,
    [typeScaleTokens.headlineSize$lg]: typeScale.headlineSize$lg,
    [typeScaleTokens.headlineLetterSpacing$lg]:
      typeScale.headlineLetterSpacing$lg,
    [typeScaleTokens.headlineWeight$lg]: typeScale.headlineWeight$lg,

    [typeScaleTokens.headlineFont$md]: typeScale.headlineFont$md,
    [typeScaleTokens.headlineLineHeight$md]: typeScale.headlineLineHeight$md,
    [typeScaleTokens.headlineSize$md]: typeScale.headlineSize$md,
    [typeScaleTokens.headlineLetterSpacing$md]:
      typeScale.headlineLetterSpacing$md,
    [typeScaleTokens.headlineWeight$md]: typeScale.headlineWeight$md,

    [typeScaleTokens.headlineFont$sm]: typeScale.headlineFont$sm,
    [typeScaleTokens.headlineLineHeight$sm]: typeScale.headlineLineHeight$sm,
    [typeScaleTokens.headlineSize$sm]: typeScale.headlineSize$sm,
    [typeScaleTokens.headlineLetterSpacing$sm]:
      typeScale.headlineLetterSpacing$sm,
    [typeScaleTokens.headlineWeight$sm]: typeScale.headlineWeight$sm,

    [typeScaleTokens.titleFont$lg]: typeScale.titleFont$lg,
    [typeScaleTokens.titleLineHeight$lg]: typeScale.titleLineHeight$lg,
    [typeScaleTokens.titleSize$lg]: typeScale.titleSize$lg,
    [typeScaleTokens.titleLetterSpacing$lg]: typeScale.titleLetterSpacing$lg,
    [typeScaleTokens.titleWeight$lg]: typeScale.titleWeight$lg,

    [typeScaleTokens.titleFont$md]: typeScale.titleFont$md,
    [typeScaleTokens.titleLineHeight$md]: typeScale.titleLineHeight$md,
    [typeScaleTokens.titleSize$md]: typeScale.titleSize$md,
    [typeScaleTokens.titleLetterSpacing$md]: typeScale.titleLetterSpacing$md,
    [typeScaleTokens.titleWeight$md]: typeScale.titleWeight$md,

    [typeScaleTokens.titleFont$sm]: typeScale.titleFont$sm,
    [typeScaleTokens.titleLineHeight$sm]: typeScale.titleLineHeight$sm,
    [typeScaleTokens.titleSize$sm]: typeScale.titleSize$sm,
    [typeScaleTokens.titleLetterSpacing$sm]: typeScale.titleLetterSpacing$sm,
    [typeScaleTokens.titleWeight$sm]: typeScale.titleWeight$sm,

    [typeScaleTokens.bodyFont$lg]: typeScale.bodyFont$lg,
    [typeScaleTokens.bodyLineHeight$lg]: typeScale.bodyLineHeight$lg,
    [typeScaleTokens.bodySize$lg]: typeScale.bodySize$lg,
    [typeScaleTokens.bodyLetterSpacing$lg]: typeScale.bodyLetterSpacing$lg,
    [typeScaleTokens.bodyWeight$lg]: typeScale.bodyWeight$lg,

    [typeScaleTokens.bodyFont$md]: typeScale.bodyFont$md,
    [typeScaleTokens.bodyLineHeight$md]: typeScale.bodyLineHeight$md,
    [typeScaleTokens.bodySize$md]: typeScale.bodySize$md,
    [typeScaleTokens.bodyLetterSpacing$md]: typeScale.bodyLetterSpacing$md,
    [typeScaleTokens.bodyWeight$md]: typeScale.bodyWeight$md,

    [typeScaleTokens.bodyFont$sm]: typeScale.bodyFont$sm,
    [typeScaleTokens.bodyLineHeight$sm]: typeScale.bodyLineHeight$sm,
    [typeScaleTokens.bodySize$sm]: typeScale.bodySize$sm,
    [typeScaleTokens.bodyLetterSpacing$sm]: typeScale.bodyLetterSpacing$sm,
    [typeScaleTokens.bodyWeight$sm]: typeScale.bodyWeight$sm,

    [typeScaleTokens.labelFont$lg]: typeScale.labelFont$lg,
    [typeScaleTokens.labelLineHeight$lg]: typeScale.labelLineHeight$lg,
    [typeScaleTokens.labelSize$lg]: typeScale.labelSize$lg,
    [typeScaleTokens.labelLetterSpacing$lg]: typeScale.labelLetterSpacing$lg,
    [typeScaleTokens.labelWeight$lg]: typeScale.labelWeight$lg,

    [typeScaleTokens.labelFont$md]: typeScale.labelFont$md,
    [typeScaleTokens.labelLineHeight$md]: typeScale.labelLineHeight$md,
    [typeScaleTokens.labelSize$md]: typeScale.labelSize$md,
    [typeScaleTokens.labelLetterSpacing$md]: typeScale.labelLetterSpacing$md,
    [typeScaleTokens.labelWeight$md]: typeScale.labelWeight$md,

    [typeScaleTokens.labelFont$sm]: typeScale.labelFont$sm,
    [typeScaleTokens.labelLineHeight$sm]: typeScale.labelLineHeight$sm,
    [typeScaleTokens.labelSize$sm]: typeScale.labelSize$sm,
    [typeScaleTokens.labelLetterSpacing$sm]: typeScale.labelLetterSpacing$sm,
    [typeScaleTokens.labelWeight$sm]: typeScale.labelWeight$sm,
  }),
  dynamicState: (state: IStateTheme) => ({
    [stateTokens.stateLayerOpacity$hover]: state.stateLayerOpacity$hover,
    [stateTokens.stateLayerOpacity$pressed]: state.stateLayerOpacity$pressed,
    [stateTokens.stateLayerOpacity$dragged]: state.stateLayerOpacity$dragged,
    [stateTokens.opacity$disabled]: state.opacity$disabled,
    [stateTokens.containerOpacity$disabled]: state.containerOpacity$disabled,
    [stateTokens.outlineOpacity$disabled]: state.outlineOpacity$disabled,
  }),
  dynamicZIndex: (zIndex: IZIndexTheme) => ({
    [zIndexTokens.mobileStepper]: zIndex.mobileStepper,
    [zIndexTokens.fab]: zIndex.fab,
    [zIndexTokens.speedDial]: zIndex.speedDial,
    [zIndexTokens.appBar]: zIndex.appBar,
    [zIndexTokens.drawer]: zIndex.drawer,
    [zIndexTokens.modal]: zIndex.modal,
    [zIndexTokens.snackbar]: zIndex.snackbar,
    [zIndexTokens.tooltip]: zIndex.tooltip,
  }),
});
