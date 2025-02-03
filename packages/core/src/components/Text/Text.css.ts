import type { IComponentThemeFactory } from '~/utils/component/componentThemeFactory';
import type { ITextVariant } from './Text.types';
import { themeTokens } from '~/components/Theme';
import { componentThemeFactory } from '~/utils/component/componentThemeFactory';
import { createComponentTheme } from '~/utils/component/createComponentTheme';
import { createStyles } from '~/utils/css/createStyles';
import { modifierSelector } from '~/utils/css/modifierSelector';
import { px } from '~/utils/css/px';
import { space } from '~/utils/css/space';
import { typography } from '~/utils/css/typography';
import { COMPONENT_NAME } from './Text.constants';

type IModifier =
  | 'variant'
  | 'size'
  | 'dimmed'
  | 'truncate'
  | 'line-clamp'
  | 'gutter-bottom';

const [tokensClassName, tokens] = createComponentTheme(COMPONENT_NAME, {
  lineClamp: 'unset',
});

const classNames = createStyles({
  root: {
    margin: 0,

    selectors: {
      [modifierSelector<IModifier>('dimmed')]: {
        color: themeTokens.colorScheme.onSurfaceVariant,
      },
      [modifierSelector<IModifier>('truncate')]: {
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
      },
      [modifierSelector<IModifier>('line-clamp')]: {
        overflow: 'hidden',
        display: '-webkit-box',
        WebkitBoxOrient: 'vertical',
        hyphens: 'auto',
        WebkitLineClamp: tokens.lineClamp,
      },
      [modifierSelector<IModifier>('gutter-bottom')]: {
        marginBottom: px(space(1)),
      },
      [modifierSelector<IModifier>({ variant: 'display', size: 'lg' })]:
        typography(themeTokens.typeScale.display.lg),
      [modifierSelector<IModifier>({ variant: 'display', size: 'md' })]:
        typography(themeTokens.typeScale.display.md),
      [modifierSelector<IModifier>({ variant: 'display', size: 'sm' })]:
        typography(themeTokens.typeScale.display.sm),
      [modifierSelector<IModifier>({ variant: 'headline', size: 'lg' })]:
        typography(themeTokens.typeScale.headline.lg),
      [modifierSelector<IModifier>({ variant: 'headline', size: 'md' })]:
        typography(themeTokens.typeScale.headline.md),
      [modifierSelector<IModifier>({ variant: 'headline', size: 'sm' })]:
        typography(themeTokens.typeScale.headline.sm),
      [modifierSelector<IModifier>({ variant: 'title', size: 'lg' })]:
        typography(themeTokens.typeScale.title.lg),
      [modifierSelector<IModifier>({ variant: 'title', size: 'md' })]:
        typography(themeTokens.typeScale.title.md),
      [modifierSelector<IModifier>({ variant: 'title', size: 'sm' })]:
        typography(themeTokens.typeScale.title.sm),
      [modifierSelector<IModifier>({ variant: 'body', size: 'lg' })]:
        typography(themeTokens.typeScale.body.lg),
      [modifierSelector<IModifier>({ variant: 'body', size: 'md' })]:
        typography(themeTokens.typeScale.body.md),
      [modifierSelector<IModifier>({ variant: 'body', size: 'sm' })]:
        typography(themeTokens.typeScale.body.sm),
      [modifierSelector<IModifier>({ variant: 'label', size: 'lg' })]:
        typography(themeTokens.typeScale.label.lg),
      [modifierSelector<IModifier>({ variant: 'label', size: 'md' })]:
        typography(themeTokens.typeScale.label.md),
      [modifierSelector<IModifier>({ variant: 'label', size: 'sm' })]:
        typography(themeTokens.typeScale.label.sm),
    },
  },
});

export type ITextThemeFactory = IComponentThemeFactory<{
  styleName: keyof typeof classNames;
  tokens: typeof tokens;
  modifier: IModifier;
  variant: ITextVariant;
}>;

export const textTheme = componentThemeFactory<ITextThemeFactory>({
  classNames,
  tokensClassName,
  tokens,
});
