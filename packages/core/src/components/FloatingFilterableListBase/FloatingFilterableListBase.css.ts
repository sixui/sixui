import { themeTokens } from '~/components/Theme';
import { createStyles } from '~/utils/css/createStyles';

export const floatingFilterableListBaseClassNames = createStyles({
  floating: {
    zIndex: themeTokens.zIndex.popover,
    position: 'absolute',
    width: 'inherit',
    height: 'inherit',
  },
});
