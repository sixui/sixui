import { getResponsiveContainerQuery } from '~/helpers/styles/getResponsiveContainerQuery';
import { createStyles } from '~/utils/styles/createStyles';
import { createTokensVars } from '~/utils/styles/createTokensVars';
import { PaperBase } from '../PaperBase';
import { themeTokens } from '../ThemeProvider';

export const responsiveStoriesClassNames = createStyles({
  root: {
    vars: createTokensVars(PaperBase.theme.tokens, {
      container: {
        color: themeTokens.colorScheme.onSurface,
        opacity: themeTokens.state.containerOpacity.disabled,
      },
    }),
  },
  root$eq$compact: {
    '@container': {
      [getResponsiveContainerQuery({ size: 'compact' })]: {
        vars: createTokensVars(PaperBase.theme.tokens, {
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
      [getResponsiveContainerQuery({ size: 'medium' })]: {
        vars: createTokensVars(PaperBase.theme.tokens, {
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
      [getResponsiveContainerQuery({ size: 'expanded' })]: {
        vars: createTokensVars(PaperBase.theme.tokens, {
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
      [getResponsiveContainerQuery({ size: 'large' })]: {
        vars: createTokensVars(PaperBase.theme.tokens, {
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
      [getResponsiveContainerQuery({ size: 'extraLarge' })]: {
        vars: createTokensVars(PaperBase.theme.tokens, {
          container: {
            color: themeTokens.colorScheme.primary,
            opacity: '1',
          },
        }),
      },
    },
  },
});
