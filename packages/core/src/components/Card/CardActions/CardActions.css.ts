import type { IComponentThemeFactory } from '~/utils/component/componentThemeFactory';
import { componentThemeFactory } from '~/utils/component/componentThemeFactory';
import { createComponentTheme } from '~/utils/component/createComponentTheme';
import { createStyles } from '~/utils/css/createStyles';
import { px } from '~/utils/css/px';
import { space } from '~/utils/css/space';
import { COMPONENT_NAME } from './CardActions.constants';

const [tokensClassName, tokens] = createComponentTheme(COMPONENT_NAME);

const classNames = createStyles({
  root: {
    display: 'flex',
    flexDirection: 'row',
    gap: px(space('$sm')),
    alignItems: 'center',
    justifyContent: 'end',
    padding: px(space('$lg')),
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
