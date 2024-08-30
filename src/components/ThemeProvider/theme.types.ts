import type { PartialDeep } from 'type-fest';

export type IThemeColorSchemeVariant = 'light' | 'dark';

export type IThemeColorScheme = {
  primary: string;
  onPrimary: string;
  primaryContainer: string;
  onPrimaryContainer: string;
  secondary: string;
  onSecondary: string;
  secondaryContainer: string;
  onSecondaryContainer: string;
  tertiary: string;
  onTertiary: string;
  tertiaryContainer: string;
  onTertiaryContainer: string;
  error: string;
  onError: string;
  errorContainer: string;
  onErrorContainer: string;
  surface: string;
  onSurface: string;
  onSurfaceVariant: string;
  surfaceContainerLowest: string;
  surfaceContainerLow: string;
  surfaceContainer: string;
  surfaceContainerHigh: string;
  surfaceContainerHighest: string;
  inverseSurface: string;
  inverseOnSurface: string;
  inversePrimary: string;
  outline: string;
  outlineVariant: string;
  primaryFixed: string;
  secondaryFixed: string;
  tertiaryFixed: string;
  primaryFixedDim: string;
  secondaryFixedDim: string;
  tertiaryFixedDim: string;
  onPrimaryFixed: string;
  onSecondaryFixed: string;
  onTertiaryFixed: string;
  onPrimaryFixedVariant: string;
  onSecondaryFixedVariant: string;
  onTertiaryFixedVariant: string;
  surfaceDim: string;
  surfaceBright: string;
  shadow: string;
  scrim: string;
};

export type IThemeColorSchemeValues = Record<
  IThemeColorSchemeVariant,
  IThemeColorScheme
>;

export type IThemeTypeFaceValues = {
  /**
   * The brand typeface is recommended for larger font sizes, such as Headline
   * and Display.
   */
  brand: string;

  /**
   * The plain typeface is suitable for smaller font sizes, such as Body and
   * Label.
   */
  plain: string;

  /**
   * Weight is the primary attribute that defines the overall thickness of a
   * typeface's strokes in any given font.
   * @see https://m3.material.io/styles/typography/type-scale-tokens#da6af10c-42cf-4d51-8940-1a7d0304d3b2
   * @see https://fonts.google.com/knowledge/choosing_type/exploring_typefaces_with_multiple_weights_or_grades
   */
  weight: {
    regular: string;
    medium: string;
    bold: string;
  };
};

export type IThemeTypeScaleRole =
  | 'display'
  | 'headline'
  | 'title'
  | 'body'
  | 'label';

export type IThemeTypeScaleSize = 'sm' | 'md' | 'lg';

export type IThemeTypeScaleStyle = {
  family: string;
  lineHeight: string;
  size: string;
  letterSpacing: string;
  weight: string;
  weightProminent: string;
};

export type IThemeTypeScale = Record<IThemeTypeScaleSize, IThemeTypeScaleStyle>;

export type IThemeTypeScaleValues = Record<
  IThemeTypeScaleRole,
  IThemeTypeScale
>;

export type IThemeDensityValues = {
  /**
   * Density is defined by a scale starting at 0 for default density. The scale
   * moves to negative numbers (-1, -2, -3) as the space between components
   * decreases, resulting in a higher density layout.
   * @see https://m3.material.io/blog/material-density-web#using-density-on-the-web
   */
  scale: string;

  /**
   * Each increment also decreases the height of a component by this interval.
   * @see https://m3.material.io/blog/material-density-web#using-density-on-the-web
   */
  interval: string;

  /**
   * Target size can help users who aren't able to see the screen, or who have
   * difficulty with small touch targets, to tap elements in your app.
   * @see https://m3.material.io/foundations/designing/structure#dab862b1-e042-4c40-b680-b484b9f077f6
   */
  minTargetSize: string;
};

export type IThemeMotionEasingValues = {
  /**
   * Emphasized easing set. This set is the most common because it captures
   * the expressive style of M3.
   * @see https://m3.material.io/styles/motion/easing-and-duration/tokens-specs#cbea5c6e-7b0d-47a0-98c3-767080a38d95
   */
  emphasized: {
    accelerate: string;
    decelerate: string;
  };

  /**
   * Standard easing set. This set is used for simple, small, or
   * utility-focused transitions.
   * @see https://m3.material.io/styles/motion/easing-and-duration/tokens-specs#601d5552-a6e6-4d74-9886-ff8f24b9ec35
   */
  standard: {
    normal: string;
    accelerate: string;
    decelerate: string;
  };
  /**
   * Linear easing.
   */
  linear: string;
};

export type IThemeMotionDurationValueSet = {
  $1: string;
  $2: string;
  $3: string;
  $4: string;
};

export type IThemeMotionDurationValues = {
  /**
   * Short durations. These are used for small utility-focused transitions.
   * @see https://m3.material.io/styles/motion/easing-and-duration/tokens-specs#97194be9-de1c-41b9-90d4-21ae2b8d3f38
   */
  short: IThemeMotionDurationValueSet;

  /**
   * Medium durations. These are used for transitions that traverse a medium
   * area of the screen.
   * @see https://m3.material.io/styles/motion/easing-and-duration/tokens-specs#e08d2356-1831-4375-bc2f-6d45230c6d98
   */
  medium: IThemeMotionDurationValueSet;

  /**
   * Long durations. These durations are often paired with Emphasized easing.
   * They're used for large expressive transitions.
   * @see https://m3.material.io/styles/motion/easing-and-duration/tokens-specs#48bf653e-46f9-48f5-87e0-eaf8ea3fe716
   */
  long: IThemeMotionDurationValueSet;

  /**
   * Extra long durations. Though rare, some transitions use durations above
   * 600ms. These are usually used for ambient transitions that don't involve
   * user input.
   * @see https://m3.material.io/styles/motion/easing-and-duration/tokens-specs#ee9dbe95-70fa-4804-8347-c4fd58c60fe2
   */
  extraLong: IThemeMotionDurationValueSet;
};

export type IThemeMotionValues = {
  /**
   * Easing functions for animations.
   * @see https://m3.material.io/styles/motion/easing-and-duration/applying-easing-and-duration#d4348fa7-87b9-4dda-be70-c126111fd63c
   * @see https://m3.material.io/styles/motion/easing-and-duration/tokens-specs#433b1153-2ea3-4fe2-9748-803a47bc97ee
   */
  easing: IThemeMotionEasingValues;

  /**
   * Transitions shouldn't be jarringly fast or so slow that users feel as
   * though they're waiting. The right combination of duration and easing
   * produces smooth and responsive transitions.
   * @see https://m3.material.io/styles/motion/easing-and-duration/applying-easing-and-duration#569498ab-3e78-4e1a-bf59-c3fc7b1a187b
   * @see https://m3.material.io/styles/motion/easing-and-duration/tokens-specs#c009dec6-f29b-4503-b9f0-482af14a8bbd
   */
  duration: IThemeMotionDurationValues;
};

export type IThemeOutlineValues = {
  width: {
    none: string;
    xs: string;
    sm: string;
    md: string;
    lg: string;
    xl: string;
  };
};

export type IThemeShapeCornerSize =
  | 'none'
  | 'xs'
  | 'sm'
  | 'md'
  | 'lg'
  | 'xl'
  | 'full';

export type IThemeShapeValues = {
  /**
   * @see https://m3.material.io/styles/shape/shape-scale-tokens#b09934f1-1b0f-4ce4-ade6-4a1f138add6c
   */
  corner: Record<IThemeShapeCornerSize, string>;
};

export type IThemeSpacingGridSize = 'sm' | 'md' | 'lg';

export type IThemeSpacingValues = {
  grid: Record<IThemeSpacingGridSize, string>;
};

export type IThemeStateValues = {
  containerOpacity: {
    disabled: string;
  };

  /**
   * A state layer is a semi-transparent covering on an element that indicates
   * its state. State layers provide a systematic approach to visualizing states
   * by using opacity.
   */
  stateLayerOpacity: {
    hover: string;
    pressed: string;
    dragged: string;
  };

  opacity: {
    disabled: string;
  };

  outlineOpacity: {
    disabled: string;
  };
};

export type IThemeZIndexValues = {
  app: string;
  modal: string;
  popover: string;
  overlay: string;
  max: string;
};

export type IThemeWindowSizeClassName =
  | 'compact'
  | 'medium'
  | 'expanded'
  | 'large'
  | 'extraLarge';

export type IThemeWindowSizeClassesValues = Record<
  IThemeWindowSizeClassName,
  string
>;

export type IThemeElevationLevel = 0 | 1 | 2 | 3 | 4 | 5;

export type IThemeElevationLevelAttributes = {
  offsetX: string;
  offsetY: string;
  blurRadius: string;
  spreadRadius: string;
  colorOpacityPercentage: string;
};

export type IThemeElevationLevelValues = {
  primary: IThemeElevationLevelAttributes;
  secondary: IThemeElevationLevelAttributes;
};

export type IThemeElevationValues = {
  transitionDuration: string;
  transitionTimingFunction: string;
  level: Record<IThemeElevationLevel, IThemeElevationLevelValues>;
};

export type IThemeComponentValues = {
  defaultProps: ((theme: ITheme2) => object) | object;
  classNames: Record<string, string>;
};

export type IThemeComponentsValues = Record<string, IThemeComponentValues>;

export type ITheme2 = {
  tokens: {
    scale: string;

    colorScheme: IThemeColorSchemeValues;

    /**
     * Typography helps make writing legible and beautiful.
     * @see https://m3.material.io/styles/typography/fonts
     */
    typeFace: IThemeTypeFaceValues;

    /**
     * A type scale is a selection of font styles that can be used across an app,
     * ensuring a flexible, yet consistent, style that accommodates a range of
     * purposes.
     * @see https://m3.material.io/styles/typography/type-scale-tokens#425022ff-21dd-4fbe-9eca-9690d0fc8b16
     */
    typeScale: IThemeTypeScaleValues;

    /**
     * Global density changes affect the spacing between all elements at a macro
     * level
     * @see https://m3.material.io/blog/material-density-web
     */
    density: IThemeDensityValues;

    /**
     * Motion makes a UI expressive and easy to use. Easing and duration create
     * responsive and expressive motion.
     * @see https://m3.material.io/styles/motion/overview
     */
    motion: IThemeMotionValues;

    /**
     * Shape can direct attention, communicate state, and express brand.
     * @see https://m3.material.io/styles/shape/overview
     */
    shape: IThemeShapeValues;

    outline: IThemeOutlineValues;

    spacing: IThemeSpacingValues;

    /**
     * States show the interaction status of a component or UI element
     * @see https://m3.material.io/foundations/interaction/states/overview
     */
    state: IThemeStateValues;

    zIndex: IThemeZIndexValues;

    /**
     * Window size classes help create layouts that scale across devices of all
     * shapes and sizes.
     * @see https://m3.material.io/foundations/layout/applying-layout/window-size-classes
     */
    windowSizeClasses: IThemeWindowSizeClassesValues;

    elevation: IThemeElevationValues;
  };

  components?: IThemeComponentsValues;
};

export type IThemeOverride = PartialDeep<ITheme2>;
