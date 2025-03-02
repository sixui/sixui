import { themeTokens } from '~/components/Theme';
import { createStyles } from '~/utils/css/createStyles';
import { responsiveContainerQuery } from '~/utils/css/responsiveContainerQuery';

export const responsiveStoriesClassNames = createStyles({
  root: {
    backgroundColor: themeTokens.colorScheme.onSurface,
    opacity: themeTokens.state.containerOpacity.disabled,
    borderRadius: themeTokens.shape.corner.xs,
  },
  root$eq$compact: {
    '@container': {
      [responsiveContainerQuery({ size: 'compact' })]: {
        backgroundColor: themeTokens.colorScheme.primary,
        opacity: '1',
      },
    },
  },
  root$eq$medium: {
    '@container': {
      [responsiveContainerQuery({ size: 'medium' })]: {
        backgroundColor: themeTokens.colorScheme.primary,
        opacity: '1',
      },
    },
  },
  root$eq$expanded: {
    '@container': {
      [responsiveContainerQuery({ size: 'expanded' })]: {
        backgroundColor: themeTokens.colorScheme.primary,
        opacity: '1',
      },
    },
  },
  root$eq$large: {
    '@container': {
      [responsiveContainerQuery({ size: 'large' })]: {
        backgroundColor: themeTokens.colorScheme.primary,
        opacity: '1',
      },
    },
  },
  root$eq$extraLarge: {
    '@container': {
      [responsiveContainerQuery({ size: 'extraLarge' })]: {
        backgroundColor: themeTokens.colorScheme.primary,
        opacity: '1',
      },
    },
  },
});
