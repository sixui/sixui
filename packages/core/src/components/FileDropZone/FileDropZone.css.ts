import type { IComponentThemeFactory } from '~/utils/component/componentThemeFactory';
import { componentThemeFactory } from '~/utils/component/componentThemeFactory';
import { createComponentTheme } from '~/utils/component/createComponentTheme';
import { modifierSelector, px, space, typography } from '~/utils/css';
import { createStyles } from '~/utils/css/createStyles';
import { themeTokens } from '~/components/Theme/theme.css';
import { COMPONENT_NAME } from './FileDropZone.constants';

type IModifier = 'disabled' | 'with-error';

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
    gap: px(space('$md')),
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
  inputContainer: {
    display: 'flex',
    flexGrow: 1,
  },
  files: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
    gap: px(space('$sm')),
  },
  dropActions: {
    display: 'flex',
    flexDirection: 'row',
    gap: px(space('sm')),
  },
  fileCard: {},
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

export type IFileDropZoneThemeFactory = IComponentThemeFactory<{
  styleName: keyof typeof classNames;
  tokens: typeof tokens;
  modifier: IModifier;
}>;

export const fileDropZoneTheme =
  componentThemeFactory<IFileDropZoneThemeFactory>({
    classNames,
    tokensClassName,
    tokens,
  });
