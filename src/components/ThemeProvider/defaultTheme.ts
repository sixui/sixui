import type {
  ITheme2,
  IThemeColorSchemeValues,
  IThemeDensityValues,
  IThemeElevationValues,
  IThemeMotionValues,
  IThemeOutlineValues,
  IThemeShapeValues,
  IThemeSpacingValues,
  IThemeStateValues,
  IThemeTypeFaceValues,
  IThemeTypeScaleValues,
  IThemeWindowSizeClassesValues,
  IThemeZIndexValues,
} from './theme.types';

// You should always explicitly set values unit (ie. `px` or `rem`). Otherwise,
// CSS calc() may not work as expected.

const typeFace: IThemeTypeFaceValues = {
  brand: 'Roboto',
  plain: 'Roboto',
  weight: {
    regular: '400',
    medium: '500',
    bold: '700',
  },
};

const colorScheme: IThemeColorSchemeValues = {
  light: {
    primary: '#6750a4',
    onPrimary: '#ffffff',
    primaryContainer: '#e9ddff',
    onPrimaryContainer: '#22005d',
    secondary: '#625b71',
    onSecondary: '#ffffff',
    secondaryContainer: '#e8def8',
    onSecondaryContainer: '#1e192b',
    tertiary: '#7e5260',
    onTertiary: '#ffffff',
    tertiaryContainer: '#ffd9e3',
    onTertiaryContainer: '#31101d',
    error: '#ba1a1a',
    onError: '#ffffff',
    errorContainer: '#ffdad6',
    onErrorContainer: '#410002',
    surface: '#fdf8fd',
    onSurface: '#1c1b1e',
    onSurfaceVariant: '#49454e',
    surfaceContainerLowest: '#ffffff',
    surfaceContainerLow: '#f8f2f7',
    surfaceContainer: '#f2ecf2',
    surfaceContainerHigh: '#ece6ec',
    surfaceContainerHighest: '#e6e1e6',
    inverseSurface: '#313033',
    inverseOnSurface: '#f4eff4',
    inversePrimary: '#cfbcff',
    outline: '#7a757f',
    outlineVariant: '#cac4cf',
    primaryFixed: '#e9ddff',
    secondaryFixed: '#e8def8',
    tertiaryFixed: '#ffd9e3',
    primaryFixedDim: '#cfbcff',
    secondaryFixedDim: '#cbc2db',
    tertiaryFixedDim: '#efb8c8',
    onPrimaryFixed: '#22005d',
    onSecondaryFixed: '#1e192b',
    onTertiaryFixed: '#31101d',
    onPrimaryFixedVariant: '#4f378a',
    onSecondaryFixedVariant: '#4a4458',
    onTertiaryFixedVariant: '#633b48',
    surfaceDim: '#ded8de',
    surfaceBright: '#fdf8fd',
    shadow: '#000000',
    scrim: '#000000',
  },
  dark: {
    primary: '#cfbcff',
    onPrimary: '#381e72',
    primaryContainer: '#4f378a',
    onPrimaryContainer: '#e9ddff',
    secondary: '#cbc2db',
    onSecondary: '#332d41',
    secondaryContainer: '#4a4458',
    onSecondaryContainer: '#e8def8',
    tertiary: '#efb8c8',
    onTertiary: '#4a2532',
    tertiaryContainer: '#633b48',
    onTertiaryContainer: '#ffd9e3',
    error: '#ffb4ab',
    onError: '#690005',
    errorContainer: '#93000a',
    onErrorContainer: '#ffdad6',
    surface: '#141316',
    onSurface: '#e6e1e6',
    onSurfaceVariant: '#cac4cf',
    surfaceContainerLowest: '#0f0e11',
    surfaceContainerLow: '#1c1b1e',
    surfaceContainer: '#211f23',
    surfaceContainerHigh: '#2b292d',
    surfaceContainerHighest: '#363438',
    inverseSurface: '#e6e1e6',
    inverseOnSurface: '#313033',
    inversePrimary: '#6750a4',
    outline: '#948f99',
    outlineVariant: '#49454e',
    primaryFixed: '#e9ddff',
    secondaryFixed: '#e8def8',
    tertiaryFixed: '#ffd9e3',
    primaryFixedDim: '#cfbcff',
    secondaryFixedDim: '#cbc2db',
    tertiaryFixedDim: '#efb8c8',
    onPrimaryFixed: '#22005d',
    onSecondaryFixed: '#1e192b',
    onTertiaryFixed: '#31101d',
    onPrimaryFixedVariant: '#4f378a',
    onSecondaryFixedVariant: '#4a4458',
    onTertiaryFixedVariant: '#633b48',
    surfaceDim: '#141316',
    surfaceBright: '#3b383d',
    shadow: '#000000',
    scrim: '#000000',
  },
};

const typeScale: IThemeTypeScaleValues = {
  display: {
    lg: {
      family: typeFace.brand,
      lineHeight: '4rem',
      size: '3.5625rem',
      letterSpacing: '-0.015625rem',
      weight: typeFace.weight.regular,
      weightProminent: typeFace.weight.medium,
    },
    md: {
      family: typeFace.brand,
      lineHeight: '3.25rem',
      size: '2.8125rem',
      letterSpacing: '0rem',
      weight: typeFace.weight.regular,
      weightProminent: typeFace.weight.medium,
    },
    sm: {
      family: typeFace.brand,
      lineHeight: '2.75rem',
      size: '2.25rem',
      letterSpacing: '0rem',
      weight: typeFace.weight.regular,
      weightProminent: typeFace.weight.medium,
    },
  },
  headline: {
    lg: {
      family: typeFace.brand,
      lineHeight: '2.5rem',
      size: '2rem',
      letterSpacing: '0rem',
      weight: typeFace.weight.regular,
      weightProminent: typeFace.weight.medium,
    },
    md: {
      family: typeFace.brand,
      lineHeight: '2.25rem',
      size: '1.75rem',
      letterSpacing: '0rem',
      weight: typeFace.weight.regular,
      weightProminent: typeFace.weight.medium,
    },
    sm: {
      family: typeFace.brand,
      lineHeight: '2rem',
      size: '1.5rem',
      letterSpacing: '0rem',
      weight: typeFace.weight.regular,
      weightProminent: typeFace.weight.medium,
    },
  },
  title: {
    lg: {
      family: typeFace.brand,
      lineHeight: '1.75rem',
      size: '1.375rem',
      letterSpacing: '0rem',
      weight: typeFace.weight.regular,
      weightProminent: typeFace.weight.medium,
    },
    md: {
      family: typeFace.plain,
      lineHeight: '1.5rem',
      size: '1rem',
      letterSpacing: '0.009375rem',
      weight: typeFace.weight.medium,
      weightProminent: typeFace.weight.bold,
    },
    sm: {
      family: typeFace.plain,
      lineHeight: '1.25rem',
      size: '0.875rem',
      letterSpacing: '0.00625rem',
      weight: typeFace.weight.medium,
      weightProminent: typeFace.weight.bold,
    },
  },
  body: {
    lg: {
      family: typeFace.plain,
      lineHeight: '1.5rem',
      size: '1rem',
      letterSpacing: '0.03125rem',
      weight: typeFace.weight.regular,
      weightProminent: typeFace.weight.medium,
    },
    md: {
      family: typeFace.plain,
      lineHeight: '1.25rem',
      size: '0.875rem',
      letterSpacing: '0.015625rem',
      weight: typeFace.weight.regular,
      weightProminent: typeFace.weight.medium,
    },
    sm: {
      family: typeFace.plain,
      lineHeight: '1rem',
      size: '0.75rem',
      letterSpacing: '0.025rem',
      weight: typeFace.weight.regular,
      weightProminent: typeFace.weight.medium,
    },
  },
  label: {
    lg: {
      family: typeFace.plain,
      lineHeight: '1.25rem',
      size: '0.875rem',
      letterSpacing: '0.00625rem',
      weight: typeFace.weight.medium,
      weightProminent: typeFace.weight.bold,
    },
    md: {
      family: typeFace.plain,
      lineHeight: '1rem',
      size: '0.75rem',
      letterSpacing: '0.03125rem',
      weight: typeFace.weight.medium,
      weightProminent: typeFace.weight.bold,
    },
    sm: {
      family: typeFace.plain,
      lineHeight: '1rem',
      size: '0.6875rem',
      letterSpacing: '0.03125rem',
      weight: typeFace.weight.regular,
      weightProminent: typeFace.weight.bold,
    },
  },
};

const density: IThemeDensityValues = {
  scale: '0',
  interval: '4px',
  minTargetSize: '48px',
};

const motion: IThemeMotionValues = {
  easing: {
    emphasized: {
      accelerate: 'cubic-bezier(0.3, 0, 0.8, 0.15)',
      decelerate: 'cubic-bezier(0.05, 0.7, 0.1, 1)',
    },
    standard: {
      normal: 'cubic-bezier(0.2, 0, 0, 1)',
      accelerate: 'cubic-bezier(0.3, 0, 1, 1)',
      decelerate: 'cubic-bezier(0, 0, 0, 1)',
    },
    linear: 'cubic-bezier(0, 0, 1, 1)',
  },
  duration: {
    short: {
      $1: '50ms',
      $2: '100ms',
      $3: '150ms',
      $4: '200ms',
    },
    medium: {
      $1: '250ms',
      $2: '300ms',
      $3: '350ms',
      $4: '400ms',
    },
    long: {
      $1: '450ms',
      $2: '500ms',
      $3: '550ms',
      $4: '600ms',
    },
    extraLong: {
      $1: '700ms',
      $2: '800ms',
      $3: '900ms',
      $4: '1000ms',
    },
  },
};

const shape: IThemeShapeValues = {
  corner: {
    none: '0px',
    xs: '6px',
    sm: '8px',
    md: '12px',
    lg: '16px',
    xl: '28px',
    full: '999px',
  },
};

const outline: IThemeOutlineValues = {
  width: {
    none: '0px',
    xs: '1px',
    sm: '2px',
    md: '3px',
    lg: '6px',
    xl: '8px',
  },
};

const spacing: IThemeSpacingValues = {
  gridSize: '4px',
};

const state: IThemeStateValues = {
  stateLayerOpacity: {
    hovered: '0.08',
    pressed: '0.12',
    dragged: '0.16',
  },
  containerOpacity: {
    disabled: '0.12',
  },
  opacity: {
    disabled: '0.38',
  },
  outlineOpacity: {
    disabled: '0.12',
  },
};

const zIndex: IThemeZIndexValues = {
  app: '100',
  modal: '200',
  popover: '300',
  overlay: '400',
  max: '9999',
};

const windowSizeClasses: IThemeWindowSizeClassesValues = {
  compact: '600px',
  medium: '960px',
  expanded: '1280px',
  large: '1440px',
  extraLarge: '',
};

const elevation: IThemeElevationValues = {
  transitionDuration: motion.duration.medium.$2,
  transitionTimingFunction: motion.easing.standard.normal,
  level: {
    0: {
      primary: {
        offsetX: '0px',
        offsetY: '0px',
        blurRadius: '0px',
        spreadRadius: '0px',
        colorOpacityPercentage: '30%',
      },
      secondary: {
        offsetX: '0px',
        offsetY: '0px',
        blurRadius: '0px',
        spreadRadius: '0px',
        colorOpacityPercentage: '15%',
      },
    },
    1: {
      primary: {
        offsetX: '0px',
        offsetY: '1px',
        blurRadius: '2px',
        spreadRadius: '0px',
        colorOpacityPercentage: '30%',
      },
      secondary: {
        offsetX: '0px',
        offsetY: '1px',
        blurRadius: '3px',
        spreadRadius: '1px',
        colorOpacityPercentage: '15%',
      },
    },
    2: {
      primary: {
        offsetX: '0px',
        offsetY: '1px',
        blurRadius: '2px',
        spreadRadius: '0px',
        colorOpacityPercentage: '30%',
      },
      secondary: {
        offsetX: '0px',
        offsetY: '2px',
        blurRadius: '6px',
        spreadRadius: '2px',
        colorOpacityPercentage: '15%',
      },
    },
    3: {
      primary: {
        offsetX: '0px',
        offsetY: '1px',
        blurRadius: '3px',
        spreadRadius: '0px',
        colorOpacityPercentage: '30%',
      },
      secondary: {
        offsetX: '0px',
        offsetY: '4px',
        blurRadius: '8px',
        spreadRadius: '3px',
        colorOpacityPercentage: '15%',
      },
    },
    4: {
      primary: {
        offsetX: '0px',
        offsetY: '2px',
        blurRadius: '3px',
        spreadRadius: '0px',
        colorOpacityPercentage: '30%',
      },
      secondary: {
        offsetX: '0px',
        offsetY: '6px',
        blurRadius: '10px',
        spreadRadius: '4px',
        colorOpacityPercentage: '15%',
      },
    },
    5: {
      primary: {
        offsetX: '0px',
        offsetY: '4px',
        blurRadius: '4px',
        spreadRadius: '0px',
        colorOpacityPercentage: '30%',
      },
      secondary: {
        offsetX: '0px',
        offsetY: '8px',
        blurRadius: '12px',
        spreadRadius: '6px',
        colorOpacityPercentage: '15%',
      },
    },
  },
};

export const defaultTheme: ITheme2 = {
  tokens: {
    scale: '1',
    colorScheme,
    typeFace,
    typeScale,
    density,
    motion,
    shape,
    outline,
    spacing,
    state,
    zIndex,
    windowSizeClasses,
    elevation,
  },
};
