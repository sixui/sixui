import type { IComponentThemeFactory } from '~/utils/styles/componentThemeFactory';
import { px } from '~/helpers/styles/px';
import { space } from '~/helpers/styles/space';
import { componentThemeFactory } from '~/utils/styles/componentThemeFactory';
import { createStyles } from '~/utils/styles/createStyles';
import { createTokensVars } from '~/utils/styles/createTokensVars';
import { PaperBase } from '../PaperBase';
import { themeTokens } from '../ThemeProvider';
import { elevationLevelPreset } from '../Elevation/Elevation.css';

type IModifier = 'disabled';

const classNames = createStyles({
  root: {
    width: 'min-content',
    display: 'flex',
    flexDirection: 'column',

    vars: createTokensVars(PaperBase.theme.tokens, {
      container: {
        color: themeTokens.colorScheme.surfaceContainer,
        elevation: elevationLevelPreset[2],
        shape: themeTokens.shape.corner.xs,
      },
    }),
  },
  section: {
    padding: px(space(3)),
  },
});

export type IColorPickerContentThemeFactory = IComponentThemeFactory<{
  styleName: keyof typeof classNames;
  modifier: IModifier;
}>;

export const colorPickerContentTheme =
  componentThemeFactory<IColorPickerContentThemeFactory>({
    classNames,
    tokens: undefined,
  });
