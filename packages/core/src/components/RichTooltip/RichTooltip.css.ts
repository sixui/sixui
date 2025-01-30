import type { IComponentThemeFactory } from '~/utils/styles/componentThemeFactory';
import { componentThemeFactory } from '~/utils/styles/componentThemeFactory';
import { createComponentTheme } from '~/utils/styles/createComponentTheme';
import { createStyles } from '~/utils/styles/createStyles';
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
