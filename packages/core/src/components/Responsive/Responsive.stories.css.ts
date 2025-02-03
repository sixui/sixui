import { PaperBase } from '~/components/PaperBase';
import { themeTokens } from '~/components/Theme';
import { createStyles } from '~/utils/css/createStyles';
import { overrideTokens } from '~/utils/css/overrideTokens';
import { responsiveContainerQuery } from '~/utils/css/responsiveContainerQuery';

export const responsiveStoriesClassNames = createStyles({
  root: {
    vars: overrideTokens(PaperBase.theme.tokens, {
      container: {
        color: themeTokens.colorScheme.onSurface,
        opacity: themeTokens.state.containerOpacity.disabled,
      },
    }),
  },
  root$eq$compact: {
    '@container': {
      [responsiveContainerQuery({ size: 'compact' })]: {
        vars: overrideTokens(PaperBase.theme.tokens, {
          container: {
            color: themeTokens.colorScheme.primary,
            opacity: '1',
          },
        }),
      },
    },
  },
  root$eq$medium: {
    '@container': {
      [responsiveContainerQuery({ size: 'medium' })]: {
        vars: overrideTokens(PaperBase.theme.tokens, {
          container: {
            color: themeTokens.colorScheme.primary,
            opacity: '1',
          },
        }),
      },
    },
  },
  root$eq$expanded: {
    '@container': {
      [responsiveContainerQuery({ size: 'expanded' })]: {
        vars: overrideTokens(PaperBase.theme.tokens, {
          container: {
            color: themeTokens.colorScheme.primary,
            opacity: '1',
          },
        }),
      },
    },
  },
  root$eq$large: {
    '@container': {
      [responsiveContainerQuery({ size: 'large' })]: {
        vars: overrideTokens(PaperBase.theme.tokens, {
          container: {
            color: themeTokens.colorScheme.primary,
            opacity: '1',
          },
        }),
      },
    },
  },
  root$eq$extraLarge: {
    '@container': {
      [responsiveContainerQuery({ size: 'extraLarge' })]: {
        vars: overrideTokens(PaperBase.theme.tokens, {
          container: {
            color: themeTokens.colorScheme.primary,
            opacity: '1',
          },
        }),
      },
    },
  },
});
