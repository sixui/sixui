import { calc } from '@vanilla-extract/css-utils';

import type { IComponentThemeFactory } from '~/utils/component/componentThemeFactory';
import { themeTokens } from '~/components/Theme';
import { componentThemeFactory } from '~/utils/component/componentThemeFactory';
import { createComponentTheme } from '~/utils/component/createComponentTheme';
import { createStyles } from '~/utils/css/createStyles';
import { modifierSelector } from '~/utils/css/modifierSelector';
import { px } from '~/utils/css/px';
import { COMPONENT_NAME } from './Slot.constants';

type IModifier = 'animation-status';

const [tokensClassName, tokens] = createComponentTheme(COMPONENT_NAME, {
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
    marginLeft: tokens.container.leadingSpace.normal,
    marginRight: tokens.container.trailingSpace.normal,

    selectors: {
      [modifierSelector({ 'animation-status': 'initial' })]: {
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
      [modifierSelector({ 'animation-status': 'entering' })]: {
        marginLeft: tokens.container.leadingSpace.normal,
        marginRight: tokens.container.trailingSpace.normal,
        opacity: 1,

        transitionProperty: 'width, opacity',
        transitionDuration: themeTokens.motion.duration.medium4,
        transitionTimingFunction:
          themeTokens.motion.easing.emphasized.decelerate,
      },
      [modifierSelector({ 'animation-status': 'entered' })]: {
        marginLeft: tokens.container.leadingSpace.normal,
        marginRight: tokens.container.trailingSpace.normal,
        opacity: 1,
      },
      [modifierSelector({ 'animation-status': 'exiting' })]: {
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
        transitionDuration: themeTokens.motion.duration.short2,
        transitionTimingFunction:
          themeTokens.motion.easing.emphasized.accelerate,
      },
      [modifierSelector({ 'animation-status': 'exited' })]: {
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
