import { calc } from '@vanilla-extract/css-utils';

import type { IComponentThemeFactory } from '~/utils/component/componentThemeFactory';
import { themeTokens } from '~/components/Theme';
import { componentThemeFactory } from '~/utils/component/componentThemeFactory';
import { createComponentTheme } from '~/utils/component/createComponentTheme';
import { createStyles } from '~/utils/css/createStyles';
import { modifierSelector } from '~/utils/css/modifierSelector';
import { px } from '~/utils/css/px';
import { space } from '~/utils/css/space';
import { typography } from '~/utils/css/typography';
import { COMPONENT_NAME } from './Divider.constants';

type IModifier =
  | 'orientation'
  | 'inset-start'
  | 'inset-end'
  | 'label-position'
  | 'vertical-align';

const [tokensClassName, tokens] = createComponentTheme(COMPONENT_NAME, {
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
  label: {
    horizontalSpace: px(space(2)),
    verticalSpace: px(space(1)),
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
      [modifierSelector<IModifier>({ orientation: 'horizontal' })]: {
        flexDirection: 'column',
        width: '100%',
      },
      [modifierSelector<IModifier>({
        orientation: 'horizontal',
        'label-position': 'top',
        'vertical-align': 'middle',
      })]: {
        transform: `translateY(${calc.add('-50%', calc.divide(tokens.stroke, 2))})`,
      },
      [modifierSelector<IModifier>({
        orientation: 'horizontal',
        'label-position': 'middle',
      })]: {
        flexDirection: 'row',

        height: tokens.stroke,
      },
      [modifierSelector<IModifier>({
        orientation: 'horizontal',
        'label-position': 'bottom',
        'vertical-align': 'middle',
      })]: {
        transform: `translateY(${calc.subtract('50%', calc.divide(tokens.stroke, 2))})`,
      },
      [modifierSelector<IModifier>({ orientation: 'vertical' })]: {
        flexDirection: 'column',
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
      [modifierSelector<IModifier>({ orientation: 'horizontal' }, root)]: {
        flexDirection: 'row',
        height: tokens.stroke,
      },
      [modifierSelector<IModifier>({ orientation: 'vertical' }, root)]: {
        flexDirection: 'column',
        width: tokens.stroke,
      },
    },
  }),
  line$start: ({ root }) => ({
    selectors: {
      [modifierSelector<IModifier>(
        { orientation: 'horizontal', 'inset-start': true },
        root,
      )]: {
        paddingInlineStart: tokens.inset.horizontal.leadingSpace,
      },
      [modifierSelector<IModifier>(
        { orientation: 'vertical', 'inset-start': true },
        root,
      )]: {
        paddingBlockStart: tokens.inset.vertical.leadingSpace,
      },
    },
  }),
  line$end: ({ root }) => ({
    selectors: {
      [modifierSelector<IModifier>(
        { orientation: 'horizontal', 'inset-end': true },
        root,
      )]: {
        paddingInlineEnd: tokens.inset.horizontal.trailingSpace,
      },
      [modifierSelector<IModifier>(
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
      [modifierSelector<IModifier>({ orientation: 'horizontal' }, root)]: {
        paddingLeft: tokens.label.horizontalSpace,
        paddingRight: tokens.label.horizontalSpace,
      },
      [modifierSelector<IModifier>(
        { orientation: 'horizontal', 'label-position': 'top' },
        root,
      )]: {
        paddingBottom: tokens.label.verticalSpace,
      },
      [modifierSelector<IModifier>(
        { orientation: 'horizontal', 'label-position': 'bottom' },
        root,
      )]: {
        paddingTop: tokens.label.verticalSpace,
      },
      [modifierSelector<IModifier>({ orientation: 'vertical' }, root)]: {
        paddingTop: tokens.label.verticalSpace,
        paddingBottom: tokens.label.verticalSpace,
        transform: `translateX(${calc.add(
          '-50%',
          calc.divide(tokens.stroke, 2),
        )})`,
      },
    },
  }),
  text: ({ root }) => ({
    textAlign: 'center',
    color: tokens.label.color,
    ...typography(tokens.label.typography),

    selectors: {
      [modifierSelector<IModifier>(
        {
          orientation: 'horizontal',
          'label-position': 'middle',
        },
        root,
      )]: {
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
