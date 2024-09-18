import { getTypographyStyles } from '~/helpers/styles/getTypographyStyles';
import { px } from '~/helpers/styles/px';
import { space } from '~/helpers/styles/space';
import { createStyles } from '~/utils/styles/createStyles';
import { themeTokens } from '../ThemeProvider';

const classNames = createStyles({
  root: {
    width: px(96),
  },
  inner: {
    position: 'relative',
    minHeight: px(96),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: px(space(4)),
    ...getTypographyStyles(themeTokens.typeScale.label.md),
  },
});

export const paperStoriesStyles = {
  classNames,
};
