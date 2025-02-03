import { createVar } from '@vanilla-extract/css';
import { calc } from '@vanilla-extract/css-utils';

import type { IComponentThemeFactory } from '~/utils/component/componentThemeFactory';
import { themeTokens } from '~/components/Theme';
import { componentThemeFactory } from '~/utils/component/componentThemeFactory';
import { createComponentTheme } from '~/utils/component/createComponentTheme';
import { createStyles } from '~/utils/css/createStyles';
import { modifierSelector } from '~/utils/css/modifierSelector';
import { px } from '~/utils/css/px';
import { COMPONENT_NAME } from './Anchored.constants';

type IModifier = 'position' | 'invisible';

const [tokensClassName, tokens] = createComponentTheme(COMPONENT_NAME, {
  offset: {
    x: px(0),
    y: px(0),
  },
});

const localVars = {
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
      [localVars.offset.x]: tokens.offset.x,
      [localVars.offset.y]: tokens.offset.y,
    },
  },
  content$circularOverlap: {
    vars: {
      [localVars.offset.x]: calc.add('14%', tokens.offset.x),
      [localVars.offset.y]: calc.add('14%', tokens.offset.y),
    },
  },
  content: ({ root }) => ({
    vars: {
      [localVars.scale]: '1',
      [localVars.translate.x]: px(0),
      [localVars.translate.y]: px(0),
    },

    position: 'absolute',
    display: 'flex',
    transitionProperty: 'transform',
    transitionDuration: themeTokens.motion.duration.short3,
    transitionTimingFunction: themeTokens.motion.easing.standard.normal,
    transform: `scale(${localVars.scale}) translate(${localVars.translate.x}, ${localVars.translate.y})`,
    transformOrigin: `${localVars.transformOrigin.x} ${localVars.transformOrigin.y}`,

    selectors: {
      [modifierSelector<IModifier>('invisible', root)]: {
        vars: {
          [localVars.scale]: '0',
        },
      },
      [modifierSelector<IModifier>('position^=top-', root)]: {
        vars: {
          top: localVars.offset.y,
          [localVars.translate.y]: '-50%',
          [localVars.transformOrigin.y]: '0%',
        },
      },
      [modifierSelector<IModifier>('position^=middle-', root)]: {
        vars: {
          top: '50%',
          [localVars.translate.y]: '-50%',
          [localVars.transformOrigin.y]: '0%',
        },
      },
      [modifierSelector<IModifier>('position^=bottom-', root)]: {
        vars: {
          bottom: localVars.offset.y,
          [localVars.translate.y]: '50%',
          [localVars.transformOrigin.y]: '100%',
        },
      },
      [modifierSelector<IModifier>('position$=-start', root)]: {
        vars: {
          left: localVars.offset.x,
          [localVars.translate.x]: '-50%',
          [localVars.transformOrigin.x]: '0%',
        },
      },
      [modifierSelector<IModifier>('position$=-center', root)]: {
        vars: {
          left: '50%',
          [localVars.translate.x]: '-50%',
          [localVars.transformOrigin.x]: '0%',
        },
      },
      [modifierSelector<IModifier>('position$=-end', root)]: {
        vars: {
          right: localVars.offset.x,
          [localVars.translate.x]: '50%',
          [localVars.transformOrigin.x]: '100%',
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
