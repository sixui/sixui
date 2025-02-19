import type { IComponentThemeFactory } from '~/utils/component/componentThemeFactory';
import { componentThemeFactory } from '~/utils/component/componentThemeFactory';
import { createComponentTheme } from '~/utils/component/createComponentTheme';
import { createStyles } from '~/utils/css/createStyles';
import { COMPONENT_NAME } from './RichTooltip.constants';

const [tokensClassName, tokens] = createComponentTheme(COMPONENT_NAME);

const classNames = createStyles({
  wrapper: {
    display: 'inline-block',
  },
});

export type IRichTooltipThemeFactory = IComponentThemeFactory<{
  styleName: keyof typeof classNames;
}>;

export const richTooltipTheme = componentThemeFactory<IRichTooltipThemeFactory>(
  {
    classNames,
    tokensClassName,
    tokens,
  },
);
