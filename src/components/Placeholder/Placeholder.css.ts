import { createTheme, style } from '@vanilla-extract/css';

import { stylesFactory, type IStylesFactory } from '~/utils/styles/stylesFactory';
import { getModifierSelector } from '~/helpers/styles/getModifierSelector';
import { px } from '~/helpers/styles/px';
import { space } from '~/helpers/styles/space';
import { getTypographyStyles } from '~/helpers/styles/getTypographyStyles';
import { themeTokens } from '../ThemeProvider';

type IModifier = 'disabled';

const [tokensClassName, tokens] = createTheme({
  container: {
    width: 'unset',
    height: 'unset',
  },
  crosshairs: {
    color: themeTokens.colorScheme.outlineVariant,
  },
  label: {
    typography: themeTokens.typeScale.label.sm,
  },
});

const classNames = {
  root: style({
    position: 'relative',
    overflow: 'hidden',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: px(tokens.container.width),
    height: px(tokens.container.height),

    selectors: {
      [getModifierSelector<IModifier>('disabled')]: {
        opacity: themeTokens.state.opacity.disabled,
      },
    },
  }),
  crosshairs: style({
    overflow: 'hidden',
    borderRadius: 'inherit',
    position: 'absolute',
    inset: 0,
    '::before': {
      content: '',
      position: 'absolute',
      top: 0,
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
      borderBottomStyle: 'solid',
      borderBottomWidth: px(themeTokens.outline.width.xs),
      borderBottomColor: tokens.crosshairs.color,
      width: '150%',
      transformOrigin: 'top left',
      transform: 'rotate(-45deg)',
    },
  }),
  label: style({
    position: 'relative',
    padding: px(space(2)),
    ...getTypographyStyles(tokens.label.typography),
  }),
};

export type IPlaceholderStylesFactory = IStylesFactory<{
  styleName: keyof typeof classNames;
  modifier: IModifier;
  tokens: typeof tokens;
}>;

export const placeholderStyles = stylesFactory<IPlaceholderStylesFactory>({
  classNames,
  tokensClassName,
  tokens,
});
