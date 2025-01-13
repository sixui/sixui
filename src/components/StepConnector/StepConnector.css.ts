import type { IComponentThemeFactory } from '~/utils/styles/componentThemeFactory';
import { componentThemeFactory } from '~/utils/styles/componentThemeFactory';
import { createStyles } from '~/utils/styles/createStyles';

const classNames = createStyles();

export type IStepConnectorThemeFactory = IComponentThemeFactory<{
  styleName: keyof typeof classNames;
}>;

export const dividerTheme = componentThemeFactory<IStepConnectorThemeFactory>({
  classNames,
  tokens: undefined,
});
