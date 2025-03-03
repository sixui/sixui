import type { IComponentThemeFactory } from '~/utils/component/componentThemeFactory';
import { componentThemeFactory } from '~/utils/component/componentThemeFactory';
import { createComponentTheme } from '~/utils/component/createComponentTheme';
import { px } from '~/utils/css';
import { createStyles } from '~/utils/css/createStyles';
import { COMPONENT_NAME } from './SimpleGrid.constants';

const [tokensClassName, tokens] = createComponentTheme(COMPONENT_NAME, {
  cols: '1',
  horizontalSpacing: px(4),
  verticalSpacing: px(4),
});

const classNames = createStyles({
  root: {
    display: 'grid',
    gridTemplateColumns: `repeat(${tokens.cols}, minmax(0, 1fr))`,
    gap: `${tokens.verticalSpacing} ${tokens.horizontalSpacing}`,
  },
});

export type ISimpleGridThemeFactory = IComponentThemeFactory<{
  styleName: keyof typeof classNames;
  tokens: typeof tokens;
}>;

export const simpleGridTheme = componentThemeFactory<ISimpleGridThemeFactory>({
  classNames,
  tokensClassName,
  tokens,
});
