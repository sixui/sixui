import { themeTokens } from '~/components/ThemeProvider';
import { createStyles } from '~/utils/styles/createStyles';

export const floatingFilterableListBaseClassNames = createStyles({
  floating: {
    zIndex: themeTokens.zIndex.popover,
    position: 'absolute',
    width: 'inherit',
    height: 'inherit',
  },
});
