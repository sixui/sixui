import { createTheme } from '@vanilla-extract/css';

import type { IComponentThemeFactory } from '~/utils/styles/componentThemeFactory';
import { getModifierSelector } from '~/helpers/styles/getModifierSelector';
import { getTypographyStyles } from '~/helpers/styles/getTypographyStyles';
import { px } from '~/helpers/styles/px';
import { space } from '~/helpers/styles/space';
import { componentThemeFactory } from '~/utils/styles/componentThemeFactory';
import { createStyles } from '~/utils/styles/createStyles';
import { cssLayers, themeTokens } from '../ThemeProvider';

type IModifier = 'orientation' | 'inset-start' | 'inset-end';

const [tokensClassName, tokens] = createTheme({
  '@layer': cssLayers.theme,
  stroke: px(themeTokens.outline.width.xs),
  shape: px(themeTokens.shape.corner.none),
  color: themeTokens.colorScheme.outlineVariant,
  inset: {
    horizontal: {
      leadingSpace: px(space(4)),
      trailingSpace: px(space(4)),
    },
    vertical: {
      leadingSpace: px(space(2)),
      trailingSpace: px(space(2)),
    },
  },
  text: {
    horizontal: {
      leadingSpace: px(space(2)),
      trailingSpace: px(space(2)),
    },
    vertical: {
      leadingSpace: px(space(1)),
      trailingSpace: px(space(1)),
    },
    typography: themeTokens.typeScale.body.sm,
    color: themeTokens.colorScheme.outline,
  },
});

const classNames = createStyles({
  root: {
    position: 'relative',
    display: 'flex',
    color: tokens.color,

    selectors: {
      [getModifierSelector<IModifier>({ orientation: 'horizontal' })]: {
        flexDirection: 'row',
        width: '100%',
        height: tokens.stroke,
      },
      [getModifierSelector<IModifier>({ orientation: 'vertical' })]: {
        flexDirection: 'column',
        width: tokens.stroke,
        alignSelf: 'stretch',
      },
    },
  },
  line: ({ root }) => ({
    display: 'flex',
    flexGrow: 1,
    color: 'inherit',

    '::before': {
      background: 'currentColor',
      content: '',
      width: '100%',
      height: '100%',
      borderRadius: tokens.shape,
    },

    selectors: {
      [getModifierSelector<IModifier>({ orientation: 'horizontal' }, root)]: {
        flexDirection: 'row',
        height: 'inherit',
      },
      [getModifierSelector<IModifier>(
        { orientation: 'horizontal', 'inset-start': true },
        root,
      )]: {
        paddingInlineStart: tokens.inset.horizontal.leadingSpace,
      },
      [getModifierSelector<IModifier>(
        { orientation: 'horizontal', 'inset-end': true },
        root,
      )]: {
        paddingInlineEnd: tokens.inset.horizontal.trailingSpace,
      },
      [getModifierSelector<IModifier>({ orientation: 'vertical' }, root)]: {
        flexDirection: 'column',
        width: 'inherit',
      },
      [getModifierSelector<IModifier>(
        { orientation: 'vertical', 'inset-start': true },
        root,
      )]: {
        paddingBlockStart: tokens.inset.vertical.leadingSpace,
      },
      [getModifierSelector<IModifier>(
        { orientation: 'vertical', 'inset-end': true },
        root,
      )]: {
        paddingBlockEnd: tokens.inset.vertical.trailingSpace,
      },
    },
  }),
  textContainer: ({ root }) => ({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'baseline',

    selectors: {
      [getModifierSelector<IModifier>({ orientation: 'horizontal' }, root)]: {
        marginInlineStart: tokens.text.horizontal.leadingSpace,
        marginInlineEnd: tokens.text.horizontal.trailingSpace,
      },
      [getModifierSelector<IModifier>({ orientation: 'vertical' }, root)]: {
        marginBlockStart: tokens.text.vertical.leadingSpace,
        marginBlockEnd: tokens.text.vertical.trailingSpace,
      },
    },
  }),
  text: ({ root }) => ({
    textAlign: 'center',
    color: tokens.text.color,
    ...getTypographyStyles(tokens.text.typography),

    selectors: {
      [getModifierSelector<IModifier>({ orientation: 'horizontal' }, root)]: {
        transform: 'translateY(-50%)',
      },
    },
  }),
});

export type IDividerThemeFactory = IComponentThemeFactory<{
  styleName: keyof typeof classNames;
  tokens: typeof tokens;
  modifier: IModifier;
}>;

export const dividerTheme = componentThemeFactory<IDividerThemeFactory>({
  classNames,
  tokensClassName,
  tokens,
});
