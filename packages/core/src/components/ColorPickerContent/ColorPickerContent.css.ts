import type { IComponentThemeFactory } from '~/utils/component/componentThemeFactory';
import { PaperBase } from '~/components/PaperBase';
import { themeTokens } from '~/components/Theme';
import { componentThemeFactory } from '~/utils/component/componentThemeFactory';
import { createComponentTheme } from '~/utils/component/createComponentTheme';
import { createStyles } from '~/utils/css/createStyles';
import { overrideTokens } from '~/utils/css/overrideTokens';
import { px } from '~/utils/css/px';
import { space } from '~/utils/css/space';
import { elevationLevelPreset } from '~/components/Elevation/Elevation.css';
import { COMPONENT_NAME } from './ColorPickerContent.constants';

type IModifier = 'disabled';

const [tokensClassName, tokens] = createComponentTheme(COMPONENT_NAME);

const classNames = createStyles({
  root: {
    width: 'min-content',
    display: 'flex',
    flexDirection: 'column',

    vars: overrideTokens(PaperBase.theme.tokens, {
      container: {
        color: themeTokens.colorScheme.surfaceContainer,
        elevation: elevationLevelPreset[2],
        shape: px(themeTokens.shape.corner.xs),
      },
    }),
  },
  section: {
    padding: px(space('$md')),
  },
});

export type IColorPickerContentThemeFactory = IComponentThemeFactory<{
  styleName: keyof typeof classNames;
  modifier: IModifier;
}>;

export const colorPickerContentTheme =
  componentThemeFactory<IColorPickerContentThemeFactory>({
    classNames,
    tokensClassName,
    tokens,
  });
