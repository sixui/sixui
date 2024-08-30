import type { IThemeColorScheme } from '~/components/ThemeProvider';

export const getContainerTextColor = (
  surface?: keyof IThemeColorScheme,
): keyof IThemeColorScheme => {
  switch (surface) {
    case 'primary':
      return 'onPrimary';
    case 'primaryContainer':
      return 'onPrimaryContainer';
    case 'secondary':
      return 'onSecondary';
    case 'secondaryContainer':
      return 'onSecondaryContainer';
    case 'tertiary':
      return 'onTertiary';
    case 'tertiaryContainer':
      return 'onTertiaryContainer';
    case 'inverseSurface':
      return 'inverseOnSurface';
    case 'error':
      return 'onError';
    default:
      return 'onSurface';
  }
};
