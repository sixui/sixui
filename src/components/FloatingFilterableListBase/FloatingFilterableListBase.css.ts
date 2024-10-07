import { createStyles } from '~/utils/styles/createStyles';
import { themeTokens } from '../ThemeProvider';

export const floatingFilterableListBaseClassNames = createStyles({
  floating: {
    zIndex: themeTokens.zIndex.popover,
    position: 'absolute',
    width: 'inherit',
    height: 'inherit',
  },
});
