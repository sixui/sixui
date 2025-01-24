import type { IComponentThemeFactory } from '~/utils/styles/componentThemeFactory';
import { PaperBase } from '~/components/PaperBase';
import { themeTokens } from '~/components/ThemeProvider';
import { px } from '~/helpers/styles/px';
import { space } from '~/helpers/styles/space';
import { componentThemeFactory } from '~/utils/styles/componentThemeFactory';
import { createStyles } from '~/utils/styles/createStyles';
import { createTokensVars } from '~/utils/styles/createTokensVars';
import { elevationLevelPreset } from '~/components/Elevation/Elevation.css';

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
        shape: px(themeTokens.shape.corner.xs),
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
