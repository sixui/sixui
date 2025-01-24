import { createTheme, createVar } from '@vanilla-extract/css';
import { calc } from '@vanilla-extract/css-utils';

import type { IComponentThemeFactory } from '~/utils/styles/componentThemeFactory';
import { cssLayers, themeTokens } from '~/components/ThemeProvider';
import { getModifierSelector } from '~/helpers/styles/getModifierSelector';
import { px } from '~/helpers/styles/px';
import { componentThemeFactory } from '~/utils/styles/componentThemeFactory';
import { createStyles } from '~/utils/styles/createStyles';

type IModifier = 'position' | 'invisible';

const [tokensClassName, tokens] = createTheme({
  '@layer': cssLayers.theme,
  offset: {
    x: px(0),
    y: px(0),
  },
});

const vars = {
  scale: createVar(),
  translate: {
    x: createVar(),
    y: createVar(),
  },
  offset: {
    x: createVar(),
    y: createVar(),
  },
  transformOrigin: {
    x: createVar(),
    y: createVar(),
  },
};

const classNames = createStyles({
  root: {
    position: 'relative',
    display: 'inline-flex',
    verticalAlign: 'middle',
  },
  content$rectangularOverlap: {
    vars: {
      [vars.offset.x]: tokens.offset.x,
      [vars.offset.y]: tokens.offset.y,
    },
  },
  content$circularOverlap: {
    vars: {
      [vars.offset.x]: calc.add('14%', tokens.offset.x),
      [vars.offset.y]: calc.add('14%', tokens.offset.y),
    },
  },
  content: ({ root }) => ({
    vars: {
      [vars.scale]: '1',
      [vars.translate.x]: px(0),
      [vars.translate.y]: px(0),
    },

    position: 'absolute',
    display: 'flex',
    transitionProperty: 'transform',
    transitionDuration: themeTokens.motion.duration.short.$3,
    transitionTimingFunction: themeTokens.motion.easing.standard.normal,
    transform: `scale(${vars.scale}) translate(${vars.translate.x}, ${vars.translate.y})`,
    transformOrigin: `${vars.transformOrigin.x} ${vars.transformOrigin.y}`,

    selectors: {
      [getModifierSelector<IModifier>('invisible', root)]: {
        vars: {
          [vars.scale]: '0',
        },
      },
      [getModifierSelector<IModifier>('position^=top-', root)]: {
        vars: {
          top: vars.offset.y,
          [vars.translate.y]: '-50%',
          [vars.transformOrigin.y]: '0%',
        },
      },
      [getModifierSelector<IModifier>('position^=middle-', root)]: {
        vars: {
          top: '50%',
          [vars.translate.y]: '-50%',
          [vars.transformOrigin.y]: '0%',
        },
      },
      [getModifierSelector<IModifier>('position^=bottom-', root)]: {
        vars: {
          bottom: vars.offset.y,
          [vars.translate.y]: '50%',
          [vars.transformOrigin.y]: '100%',
        },
      },
      [getModifierSelector<IModifier>('position$=-start', root)]: {
        vars: {
          left: vars.offset.x,
          [vars.translate.x]: '-50%',
          [vars.transformOrigin.x]: '0%',
        },
      },
      [getModifierSelector<IModifier>('position$=-center', root)]: {
        vars: {
          left: '50%',
          [vars.translate.x]: '-50%',
          [vars.transformOrigin.x]: '0%',
        },
      },
      [getModifierSelector<IModifier>('position$=-end', root)]: {
        vars: {
          right: vars.offset.x,
          [vars.translate.x]: '50%',
          [vars.transformOrigin.x]: '100%',
        },
      },
    },
  }),
});

export type IAnchoredThemeFactory = IComponentThemeFactory<{
  styleName: keyof typeof classNames;
  tokens: typeof tokens;
  modifier: IModifier;
}>;

export const anchoredTheme = componentThemeFactory<IAnchoredThemeFactory>({
  classNames,
  tokensClassName,
  tokens,
});
