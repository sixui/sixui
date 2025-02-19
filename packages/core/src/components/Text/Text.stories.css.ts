import { themeTokens } from '~/components/Theme';
import { createStyles } from '~/utils/css/createStyles';
import { modifierSelector } from '~/utils/css/modifierSelector';
import { px } from '~/utils/css/px';
import { space } from '~/utils/css/space';

const classNames = createStyles({
  container: {
    borderWidth: 1,
    borderStyle: 'dashed',
    borderColor: themeTokens.colorScheme.outline,
    padding: px(space(4)),
    selectors: {
      [modifierSelector('size="sm"')]: {
        maxWidth: px(150),
      },
      [modifierSelector('size="md"')]: {
        maxWidth: px(300),
      },
      [modifierSelector('size="lg"')]: {
        maxWidth: px(600),
      },
    },
  },
  truncatedContainer: {
    maxWidth: px(1200),
  },
});

export const textStoriesStyles = {
  classNames,
};
