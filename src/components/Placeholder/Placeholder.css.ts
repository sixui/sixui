import { createTheme } from '@vanilla-extract/css';

import {
  stylesFactory,
  type IStylesFactory,
} from '~/utils/styles/stylesFactory';
import { createStyles } from '~/utils/styles/createStyles';
import { getModifierSelector } from '~/helpers/styles/getModifierSelector';
import { px } from '~/helpers/styles/px';
import { space } from '~/helpers/styles/space';
import { getTypographyStyles } from '~/helpers/styles/getTypographyStyles';
import { themeTokens } from '../ThemeProvider';
import { PaperBase } from '../PaperBase';

type IModifier = 'disabled';

const [tokensClassName, tokens] = createTheme({
  crosshairs: {
    color: themeTokens.colorScheme.outlineVariant,
  },
  label: {
    typography: themeTokens.typeScale.label.sm,
    color: themeTokens.colorScheme.onSurface,
    opacity: '1',
  },
});

const classNames = createStyles({
  root: {
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    color: tokens.label.color,

    selectors: {
      [getModifierSelector<IModifier>('disabled')]: {
        vars: {
          [PaperBase.styles.tokens.container.opacity]:
            themeTokens.state.containerOpacity.disabled,
        },
      },
    },
  },
  crosshairs: ({ root }) => ({
    overflow: 'hidden',
    borderRadius: 'inherit',
    position: 'absolute',
    inset: 0,
    '::before': {
      content: '',
      position: 'absolute',
      top: 0,
      left: 0,
      borderTopStyle: 'solid',
      borderTopWidth: px(themeTokens.outline.width.xs),
      borderTopColor: tokens.crosshairs.color,
      width: '150%',
      transformOrigin: 'top left',
      transform: 'rotate(45deg)',
    },
    '::after': {
      content: '',
      position: 'absolute',
      bottom: 0,
      left: 0,
      borderBottomStyle: 'solid',
      borderBottomWidth: px(themeTokens.outline.width.xs),
      borderBottomColor: tokens.crosshairs.color,
      width: '150%',
      transformOrigin: 'top left',
      transform: 'rotate(-45deg)',
    },

    selectors: {
      [`${getModifierSelector<IModifier>('disabled', root)}::before`]: {
        opacity: themeTokens.state.opacity.disabled,
      },
      [`${getModifierSelector<IModifier>('disabled', root)}::after`]: {
        opacity: themeTokens.state.opacity.disabled,
      },
    },
  }),
  label: ({ root }) => ({
    position: 'relative',
    padding: px(space(2)),
    opacity: tokens.label.opacity,
    ...getTypographyStyles(tokens.label.typography),

    selectors: {
      [getModifierSelector<IModifier>('disabled', root)]: {
        vars: {
          [tokens.label.opacity]: themeTokens.state.opacity.disabled,
        },
      },
    },
  }),
});

export type IPlaceholderStylesFactory = IStylesFactory<{
  styleName: keyof typeof classNames;
  tokens: typeof tokens;
  modifier: IModifier;
}>;

export const placeholderStyles = stylesFactory<IPlaceholderStylesFactory>({
  classNames,
  tokensClassName,
  tokens,
});