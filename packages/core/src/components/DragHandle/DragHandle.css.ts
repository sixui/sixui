import type { IInteraction } from '~/hooks/useInteractions';
import type { IComponentThemeFactory } from '~/utils/component/componentThemeFactory';
import { PaperBase } from '~/components/PaperBase';
import { StateLayer } from '~/components/StateLayer';
import { themeTokens } from '~/components/Theme';
import { TouchTarget } from '~/components/TouchTarget';
import { componentThemeFactory } from '~/utils/component/componentThemeFactory';
import { createComponentTheme } from '~/utils/component/createComponentTheme';
import { createStyles } from '~/utils/css/createStyles';
import { modifierSelector } from '~/utils/css/modifierSelector';
import { overrideTokens } from '~/utils/css/overrideTokens';
import { px } from '~/utils/css/px';
import { COMPONENT_NAME } from './DragHandle.constants';

type IModifier = IInteraction | 'orientation';

const [tokensClassName, tokens] = createComponentTheme(COMPONENT_NAME, {
  touchTargetSize: px(24),
  container: {
    length: {
      normal: px(48),
      active: px(52),
    },
    thickness: {
      normal: px(4),
      active: px(8),
    },
    shape: px(themeTokens.shape.corner.full),
    color: {
      normal: themeTokens.colorScheme.outline,
      active: themeTokens.colorScheme.onSurface,
    },
    stateLayer: {
      focused: themeTokens.colorScheme.inverseOnSurface,
      hovered: themeTokens.colorScheme.inverseOnSurface,
    },
  },
});

const classNames = createStyles({
  root: {
    transitionProperty: 'width, height',
    transitionDuration: themeTokens.motion.duration.short2,
    transitionTimingFunction: themeTokens.motion.easing.standard.normal,

    vars: overrideTokens(PaperBase.theme.tokens, {
      container: {
        color: tokens.container.color.normal,
        shape: tokens.container.shape,
      },
    }),

    selectors: {
      [modifierSelector<IModifier>({ orientation: 'vertical' })]: {
        width: tokens.container.thickness.normal,
        height: tokens.container.length.normal,
        cursor: 'ew-resize',
      },
      [[
        modifierSelector<IModifier>({ orientation: 'vertical', focused: true }),
        modifierSelector<IModifier>({ orientation: 'vertical', hovered: true }),
        modifierSelector<IModifier>({ orientation: 'vertical', pressed: true }),
      ].join(', ')]: {
        width: tokens.container.thickness.active,
        height: tokens.container.length.active,
      },
      [modifierSelector<IModifier>({ orientation: 'horizontal' })]: {
        width: tokens.container.length.normal,
        height: tokens.container.thickness.normal,
        cursor: 'ns-resize',
      },
      [[
        modifierSelector<IModifier>({
          orientation: 'horizontal',
          focused: true,
        }),
        modifierSelector<IModifier>({
          orientation: 'horizontal',
          hovered: true,
        }),
        modifierSelector<IModifier>({
          orientation: 'horizontal',
          pressed: true,
        }),
      ].join(', ')]: {
        width: tokens.container.length.active,
        height: tokens.container.thickness.active,
      },
    },
  },
  stateLayer: {
    vars: overrideTokens(StateLayer.theme.tokens, {
      color: {
        focused: tokens.container.stateLayer.focused,
        hovered: tokens.container.stateLayer.hovered,
        pressed: tokens.container.color.active,
      },
      opacity: {
        pressed: '1',
      },
    }),
  },
  touchTarget: ({ root }) => ({
    selectors: {
      [modifierSelector<IModifier>({ orientation: 'vertical' }, root)]: {
        vars: overrideTokens(TouchTarget.theme.tokens, {
          width: tokens.touchTargetSize,
        }),
      },
      [modifierSelector<IModifier>({ orientation: 'horizontal' }, root)]: {
        vars: overrideTokens(TouchTarget.theme.tokens, {
          height: tokens.touchTargetSize,
        }),
      },
    },
  }),
});

export type IDragHandleThemeFactory = IComponentThemeFactory<{
  styleName: keyof typeof classNames;
  tokens: typeof tokens;
  modifier: IModifier;
}>;

export const resizeHandleTheme = componentThemeFactory<IDragHandleThemeFactory>(
  {
    classNames,
    tokensClassName,
    tokens,
  },
);
