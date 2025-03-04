import { createStyles } from '~/utils/css/createStyles';
import { themeTokens } from '~/components/Theme/theme.css';

export const floatingFilterableListBaseClassNames = createStyles({
  floating: {
    zIndex: themeTokens.zIndex.popover,
    position: 'absolute',
    width: 'inherit',
    height: 'inherit',
  },
});
