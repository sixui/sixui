import type { IComponentThemeFactory } from '~/utils/styles/componentThemeFactory';
import { px } from '~/helpers/styles/px';
import { space } from '~/helpers/styles/space';
import { componentThemeFactory } from '~/utils/styles/componentThemeFactory';
import { createComponentTheme } from '~/utils/styles/createComponentTheme';
import { createStyles } from '~/utils/styles/createStyles';
import { COMPONENT_NAME } from './CardActions.constants';

const [tokensClassName, tokens] = createComponentTheme(COMPONENT_NAME);

const classNames = createStyles({
  root: {
    display: 'flex',
    flexDirection: 'row',
    gap: px(space(2)),
    alignItems: 'center',
    justifyContent: 'end',
    padding: px(space(4)),
    position: 'relative',
  },
});

export type ICardActionsThemeFactory = IComponentThemeFactory<{
  styleName: keyof typeof classNames;
}>;

export const cardActionsTheme = componentThemeFactory<ICardActionsThemeFactory>(
  {
    classNames,
    tokensClassName,
    tokens,
  },
);
