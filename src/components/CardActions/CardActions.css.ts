import type { IComponentThemeFactory } from '~/utils/styles/componentThemeFactory';
import { px } from '~/helpers/styles/px';
import { space } from '~/helpers/styles/space';
import { componentThemeFactory } from '~/utils/styles/componentThemeFactory';
import { createStyles } from '~/utils/styles/createStyles';

const classNames = createStyles({
  root: {
    display: 'flex',
    flexDirection: 'row',
    gap: px(space(2)),
    alignItems: 'center',
    justifyContent: 'end',
    padding: px(space(4)),
  },
});

export type ICardActionsThemeFactory = IComponentThemeFactory<{
  styleName: keyof typeof classNames;
}>;

export const cardActionsTheme = componentThemeFactory<ICardActionsThemeFactory>(
  {
    classNames,
    tokens: undefined,
  },
);
