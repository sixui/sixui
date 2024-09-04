import { createTheme, createVar } from '@vanilla-extract/css';
import { calc } from '@vanilla-extract/css-utils';

import {
  stylesFactory,
  type IStylesFactory,
} from '~/utils/styles/stylesFactory';
import { createStyles } from '~/utils/styles/createStyles';
import { getModifierSelector } from '~/helpers/styles/getModifierSelector';
import { px } from '~/helpers/styles/px';
import { themeTokens } from '../ThemeProvider';

type IModifier = 'position' | 'invisible' | 'overlap';

const [tokensClassName, tokens] = createTheme({
  offset: {
    x: '0px',
    y: '0px',
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
  content: ({ root }) => ({
    vars: {
      [vars.scale]: '1',
      [vars.offset.x]: tokens.offset.x,
      [vars.offset.y]: tokens.offset.y,
      [vars.translate.x]: '0px',
      [vars.translate.y]: '0px',
    },

    position: 'absolute',
    display: 'flex',
    transitionProperty: 'transform',
    transitionDuration: themeTokens.motion.duration.short.$3,
    transitionTimingFunction: themeTokens.motion.easing.standard.normal,
    transform: `scale(${vars.scale}) translate(${vars.translate.x}, ${vars.translate.y})`,
    transformOrigin: `${px(vars.transformOrigin.x)} ${px(vars.transformOrigin.y)}`,

    selectors: {
      [getModifierSelector<IModifier>('invisible', root)]: {
        vars: {
          [vars.scale]: '0',
        },
      },
      [getModifierSelector<IModifier>(
        [
          { overlap: 'circular', position: 'top-start' },
          { overlap: 'circular', position: 'top-end' },
          { overlap: 'circular', position: 'bottom-start' },
          { overlap: 'circular', position: 'bottom-end' },
        ],
        root,
      )]: {
        vars: {
          [vars.offset.x]: calc.add('14%', tokens.offset.x),
          [vars.offset.y]: calc.add('14%', tokens.offset.y),
        },
      },
      [getModifierSelector<IModifier>('position^=top-', root)]: {
        vars: {
          top: px(vars.offset.y),
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
          bottom: px(vars.offset.y),
          [vars.translate.y]: '50%',
          [vars.transformOrigin.y]: '100%',
        },
      },
      [getModifierSelector<IModifier>('position$=-start', root)]: {
        vars: {
          left: px(vars.offset.x),
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
          right: px(vars.offset.x),
          [vars.translate.x]: '50%',
          [vars.transformOrigin.x]: '100%',
        },
      },
    },
  }),
});

export type IAnchoredStylesFactory = IStylesFactory<{
  styleName: keyof typeof classNames;
  tokens: typeof tokens;
  modifier: IModifier;
}>;

export const anchoredStyles = stylesFactory<IAnchoredStylesFactory>({
  classNames,
  tokensClassName,
  tokens,
});
