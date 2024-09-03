import {
  stylesFactory,
  type IStylesFactory,
} from '~/utils/styles/stylesFactory';
import { createStyles } from '~/utils/styles/createStyles';
import { themeTokens } from '../ThemeProvider';
import { px } from '~/helpers/styles/px';
import { getModifierSelector } from '~/helpers/styles/getModifierSelector';
import { zIndex } from '~/helpers/styles/zIndex';

const classNames = createStyles({
  root: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    width: `max(${px(themeTokens.density.minTargetSize)}, 100%)`,
    height: `max(${px(themeTokens.density.minTargetSize)}, 100%)`,
    transform: 'translate(-50%, -50%)',

    selectors: {
      [getModifierSelector('hovered')]: {
        zIndex: zIndex(1),
      },
    },
  },
});

export type ITouchTargetStylesFactory = IStylesFactory<{
  styleName: keyof typeof classNames;
}>;

export const touchTargetStyles = stylesFactory<ITouchTargetStylesFactory>({
  classNames,
  tokens: undefined,
});
