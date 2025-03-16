import type { ISuggestBaseThemeFactory } from '~/components/SuggestBase/SuggestBase.css';
import { createStyles } from '~/utils/css/createStyles';
import { suggestBaseTheme } from '~/components/SuggestBase/SuggestBase.css';

export type ISuggestControlThemeFactory = ISuggestBaseThemeFactory;

export const classNames = createStyles({
  input: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: '100%',
    pointerEvents: 'none',
    opacity: 0,
  },
});

export const suggestControlTheme = suggestBaseTheme;
