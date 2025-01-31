import type { IComponentThemeFactory } from '~/utils/component/componentThemeFactory';
import type { IBottomSheetContentVariant } from './BottomSheetContent.types';
import { PaperBase } from '~/components/PaperBase';
import { themeTokens } from '~/components/ThemeProvider';
import { componentThemeFactory } from '~/utils/component/componentThemeFactory';
import { createComponentTheme } from '~/utils/component/createComponentTheme';
import { createStyles } from '~/utils/css/createStyles';
import { overrideTokens } from '~/utils/css/overrideTokens';
import { px } from '~/utils/css/px';
import { space } from '~/utils/css/space';
import { elevationLevelPreset } from '~/components/Elevation/Elevation.css';
import { COMPONENT_NAME } from './BottomSheetContent.constants';

const [tokensClassName, tokens] = createComponentTheme(COMPONENT_NAME, {
  container: {
    color: themeTokens.colorScheme.surfaceContainerLow,
    elevation: elevationLevelPreset[1],
    shape: themeTokens.shape.corner.xl,
  },
  dragHandle: {
    color: themeTokens.colorScheme.onSurfaceVariant,
    opacity: '0.4',
    width: px(32),
    height: px(4),
    topSpace: px(22),
    bottomSpace: px(22),
  },
});

const classNames = createStyles({
  root: {
    vars: overrideTokens(PaperBase.theme.tokens, {
      container: {
        color: tokens.container.color,
        elevation: tokens.container.elevation,
        shape: tokens.container.shape,
      },
    }),
  },
  dragHandle: {
    paddingTop: tokens.dragHandle.topSpace,
    height: tokens.dragHandle.height,
  },
  closeButton: {
    position: 'absolute',
    right: px(space(2)),
    top: px(space(2)),
  },
});

export type IBottomSheetContentThemeFactory = IComponentThemeFactory<{
  styleName: keyof typeof classNames;
  tokens: typeof tokens;
  variant: IBottomSheetContentVariant;
}>;

export const bottomSheetContentTheme =
  componentThemeFactory<IBottomSheetContentThemeFactory>({
    classNames,
    tokensClassName,
    tokens,
  });

export const bottomSheetContentThemeVariants = {
  standard: createStyles(),
  minimized: createStyles({
    root: {
      vars: overrideTokens(PaperBase.theme.tokens, {
        container: {
          shape: `${themeTokens.shape.corner.xl} ${themeTokens.shape.corner.xl} ${themeTokens.shape.corner.none} ${themeTokens.shape.corner.none}`,
        },
      }),
    },
  }),
};
