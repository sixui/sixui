import type { IComponentThemeFactory } from '~/utils/component/componentThemeFactory';
import { componentThemeFactory } from '~/utils/component/componentThemeFactory';
import { createComponentTheme } from '~/utils/component/createComponentTheme';
import { density, modifierSelector, px, space, typography } from '~/utils/css';
import { createStyles } from '~/utils/css/createStyles';
import { themeTokens } from '~/components/Theme/theme.css';
import { COMPONENT_NAME } from './FileDropZoneControl.constants';

type IModifier = 'disabled' | 'with-error';

const DENSITY = px(density({ min: -2, max: 0 }));

const [tokensClassName, tokens] = createComponentTheme(COMPONENT_NAME, {
  supportingText: {
    typography: themeTokens.typeScale.body.sm,
    color: {
      normal: themeTokens.colorScheme.onSurfaceVariant,
      error: themeTokens.colorScheme.error,
    },
  },
});

const classNames = createStyles({
  root: {
    display: 'flex',
    flexDirection: 'column',
    gap: px(space('$sm', DENSITY)),
  },
  dropZoneContainer: {
    flexGrow: 1,
  },
  dropZone: {
    flexGrow: 1,
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
  },
  dropActions: {
    display: 'flex',
    flexDirection: 'row',
    gap: px(space('$sm')),
  },
  supportingText: ({ root }) => ({
    display: 'flex',
    flexDirection: 'row',
    ...typography(tokens.supportingText.typography),
    color: tokens.supportingText.color.normal,

    selectors: {
      [modifierSelector<IModifier>('with-error', root)]: {
        color: tokens.supportingText.color.error,
      },
    },
  }),
  supportingTextLeft: {
    flexGrow: 1,
  },
  supportingTextRight: {
    flexGrow: 0,
  },
});

export type IFileDropZoneControlThemeFactory = IComponentThemeFactory<{
  styleName: keyof typeof classNames;
  tokens: typeof tokens;
  modifier: IModifier;
}>;

export const fileDropZoneControlTheme =
  componentThemeFactory<IFileDropZoneControlThemeFactory>({
    classNames,
    tokensClassName,
    tokens,
  });
