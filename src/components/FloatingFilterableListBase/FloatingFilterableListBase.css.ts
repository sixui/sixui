import { createStyles } from '~/utils/styles/createStyles';
import { themeTokens } from '../ThemeProvider';

export const floatingFilterableListBaseClassNames = createStyles({
  root: {
    zIndex: themeTokens.zIndex.popover,
  },
  floating: {
    width: 'inherit',
    height: 'inherit',
    position: 'absolute',
    zIndex: themeTokens.zIndex.popover,
  },
});
