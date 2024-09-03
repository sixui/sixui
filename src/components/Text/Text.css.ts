import { createTheme } from '@vanilla-extract/css';

import { createStyles } from '~/utils/styles/createStyles';
import {
  stylesFactory,
  type IStylesFactory,
} from '~/utils/styles/stylesFactory';
import { getTypographyStyles } from '~/helpers/styles/getTypographyStyles';
import { getModifierSelector } from '~/helpers/styles/getModifierSelector';
import { space } from '~/helpers/styles/space';
import { px } from '~/helpers/styles/px';
import { themeTokens } from '../ThemeProvider';

type IModifier =
  | 'variant'
  | 'size'
  | 'dimmed'
  | 'truncate'
  | 'line-clamp'
  | 'gutter-bottom';

const [tokensClassName, tokens] = createTheme({
  lineClamp: 'unset',
});

const classNames = createStyles({
  root: {
    margin: 0,

    selectors: {
      [getModifierSelector<IModifier>('dimmed')]: {
        color: themeTokens.colorScheme.onSurfaceVariant,
      },
      [getModifierSelector<IModifier>('truncate')]: {
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
      },
      [getModifierSelector<IModifier>('line-clamp')]: {
        overflow: 'hidden',
        display: '-webkit-box',
        WebkitBoxOrient: 'vertical',
        hyphens: 'auto',
        WebkitLineClamp: tokens.lineClamp,
      },
      [getModifierSelector<IModifier>('gutter-bottom')]: {
        marginBottom: px(space(1)),
      },
      [getModifierSelector<IModifier>({ variant: 'display', size: 'lg' })]:
        getTypographyStyles(themeTokens.typeScale.display.lg),
      [getModifierSelector<IModifier>({ variant: 'display', size: 'md' })]:
        getTypographyStyles(themeTokens.typeScale.display.md),
      [getModifierSelector<IModifier>({ variant: 'display', size: 'sm' })]:
        getTypographyStyles(themeTokens.typeScale.display.sm),
      [getModifierSelector<IModifier>({ variant: 'headline', size: 'lg' })]:
        getTypographyStyles(themeTokens.typeScale.headline.lg),
      [getModifierSelector<IModifier>({ variant: 'headline', size: 'md' })]:
        getTypographyStyles(themeTokens.typeScale.headline.md),
      [getModifierSelector<IModifier>({ variant: 'headline', size: 'sm' })]:
        getTypographyStyles(themeTokens.typeScale.headline.sm),
      [getModifierSelector<IModifier>({ variant: 'title', size: 'lg' })]:
        getTypographyStyles(themeTokens.typeScale.title.lg),
      [getModifierSelector<IModifier>({ variant: 'title', size: 'md' })]:
        getTypographyStyles(themeTokens.typeScale.title.md),
      [getModifierSelector<IModifier>({ variant: 'title', size: 'sm' })]:
        getTypographyStyles(themeTokens.typeScale.title.sm),
      [getModifierSelector<IModifier>({ variant: 'body', size: 'lg' })]:
        getTypographyStyles(themeTokens.typeScale.body.lg),
      [getModifierSelector<IModifier>({ variant: 'body', size: 'md' })]:
        getTypographyStyles(themeTokens.typeScale.body.md),
      [getModifierSelector<IModifier>({ variant: 'body', size: 'sm' })]:
        getTypographyStyles(themeTokens.typeScale.body.sm),
      [getModifierSelector<IModifier>({ variant: 'label', size: 'lg' })]:
        getTypographyStyles(themeTokens.typeScale.label.lg),
      [getModifierSelector<IModifier>({ variant: 'label', size: 'md' })]:
        getTypographyStyles(themeTokens.typeScale.label.md),
      [getModifierSelector<IModifier>({ variant: 'label', size: 'sm' })]:
        getTypographyStyles(themeTokens.typeScale.label.sm),
    },
  },
});

export type ITextStylesFactory = IStylesFactory<{
  styleName: keyof typeof classNames;
  tokens: typeof tokens;
  modifier: IModifier;
}>;

export const textStyles = stylesFactory<ITextStylesFactory>({
  classNames,
  tokensClassName,
  tokens,
});
