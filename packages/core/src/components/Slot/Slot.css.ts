import { calc } from '@vanilla-extract/css-utils';

import type { IComponentThemeFactory } from '~/utils/styles/componentThemeFactory';
import { themeTokens } from '~/components/ThemeProvider';
import { getModifierSelector } from '~/helpers/styles/getModifierSelector';
import { px } from '~/helpers/styles/px';
import { componentThemeFactory } from '~/utils/styles/componentThemeFactory';
import { createStyles } from '~/utils/styles/createStyles';
import { createTheme } from '~/utils/styles/createTheme';

type IModifier = 'animation-status';

const [tokensClassName, tokens] = createTheme({
  container: {
    width: px(40),
    leadingSpace: {
      normal: px(0),
      compensated: px(0),
    },
    trailingSpace: {
      normal: px(0),
      compensated: px(0),
    },
  },
});

const classNames = createStyles({
  root: {
    width: tokens.container.width,

    selectors: {
      [getModifierSelector({ 'animation-status': 'initial' })]: {
        opacity: 0,
        marginLeft: calc.add(
          tokens.container.leadingSpace.normal,
          tokens.container.leadingSpace.compensated,
        ),
        marginRight: calc.add(
          tokens.container.trailingSpace.normal,
          tokens.container.trailingSpace.compensated,
        ),
        width: calc.add(
          calc.negate(tokens.container.leadingSpace.compensated),
          calc.negate(tokens.container.trailingSpace.compensated),
        ),
      },
      [getModifierSelector({ 'animation-status': 'entering' })]: {
        marginLeft: tokens.container.leadingSpace.normal,
        marginRight: tokens.container.trailingSpace.normal,
        opacity: 1,

        transitionProperty: 'width, opacity',
        transitionDuration: themeTokens.motion.duration.medium.$4,
        transitionTimingFunction:
          themeTokens.motion.easing.emphasized.decelerate,
      },
      [getModifierSelector({ 'animation-status': 'entered' })]: {
        marginLeft: tokens.container.leadingSpace.normal,
        marginRight: tokens.container.trailingSpace.normal,
        opacity: 1,
      },
      [getModifierSelector({ 'animation-status': 'exiting' })]: {
        opacity: 0,
        marginLeft: calc.add(
          tokens.container.leadingSpace.normal,
          tokens.container.leadingSpace.compensated,
        ),
        marginRight: calc.add(
          tokens.container.trailingSpace.normal,
          tokens.container.trailingSpace.compensated,
        ),
        width: 0,

        transitionProperty: 'width, opacity',
        transitionDuration: themeTokens.motion.duration.short.$2,
        transitionTimingFunction:
          themeTokens.motion.easing.emphasized.accelerate,
      },
      [getModifierSelector({ 'animation-status': 'exited' })]: {
        marginLeft: tokens.container.leadingSpace.normal,
        marginRight: tokens.container.trailingSpace.normal,
        opacity: 0,
        width: calc.add(
          calc.negate(tokens.container.leadingSpace.compensated),
          calc.negate(tokens.container.trailingSpace.compensated),
        ),
      },
    },
  },
  progressIndicator: {},
});

export type ISlotThemeFactory = IComponentThemeFactory<{
  styleName: keyof typeof classNames;
  tokens: typeof tokens;
  modifier: IModifier;
}>;

export const slotTheme = componentThemeFactory<ISlotThemeFactory>({
  classNames,
  tokensClassName,
  tokens,
});
