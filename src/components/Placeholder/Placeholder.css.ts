import { createTheme } from '@vanilla-extract/css';

import {
  stylesFactory,
  type IStylesFactory,
} from '~/utils/styles/stylesFactory';
import { getModifierSelector } from '~/helpers/styles/getModifierSelector';
import { px } from '~/helpers/styles/px';
import { space } from '~/helpers/styles/space';
import { getTypographyStyles } from '~/helpers/styles/getTypographyStyles';
import { themeTokens } from '../ThemeProvider';
import { createStyles } from '~/utils/styles/createStyles';

type IModifier = 'disabled';

const [tokensClassName, tokens] = createTheme({
  crosshairs: {
    color: themeTokens.colorScheme.outlineVariant,
  },
  label: {
    typography: themeTokens.typeScale.label.sm,
  },
});

const classNames = createStyles({
  root: {
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',

    selectors: {
      [getModifierSelector<IModifier>('disabled')]: {
        opacity: themeTokens.state.opacity.disabled,
      },
    },
  },
  crosshairs: {
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
  },
  label: {
    position: 'relative',
    padding: px(space(2)),
    ...getTypographyStyles(tokens.label.typography),
  },
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
