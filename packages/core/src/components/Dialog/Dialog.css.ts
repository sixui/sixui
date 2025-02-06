import { calc } from '@vanilla-extract/css-utils';

import type { IComponentThemeFactory } from '~/utils/component/componentThemeFactory';
import { componentThemeFactory } from '~/utils/component/componentThemeFactory';
import { createComponentTheme } from '~/utils/component/createComponentTheme';
import { px, space } from '~/utils/css';
import { createStyles } from '~/utils/css/createStyles';
import { COMPONENT_NAME } from './Dialog.constants';

const [tokensClassName, tokens] = createComponentTheme(COMPONENT_NAME, {
  overlay: {
    shiftIndex: '0',
    shift: px(space(4)),
  },
});

const classNames = createStyles({
  root: {
    position: 'fixed',
    top: '50%',
    left: '50%',
    transform: `translate(${calc.add(
      '-50%',
      calc.multiply(tokens.overlay.shiftIndex, tokens.overlay.shift),
    )}, ${calc.add('-50%', calc.multiply(tokens.overlay.shiftIndex, tokens.overlay.shift))})`,
    overflow: 'visible',
  },
});

export type IDialogThemeFactory = IComponentThemeFactory<{
  styleName: keyof typeof classNames;
  tokens: typeof tokens;
}>;

export const dialogTheme = componentThemeFactory<IDialogThemeFactory>({
  classNames,
  tokensClassName,
  tokens,
});
