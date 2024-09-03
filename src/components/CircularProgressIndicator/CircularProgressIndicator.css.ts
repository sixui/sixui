import { createTheme } from '@vanilla-extract/css';

import {
  stylesFactory,
  type IStylesFactory,
} from '~/utils/styles/stylesFactory';
import { createStyles } from '~/utils/styles/createStyles';
import { themeTokens } from '../ThemeProvider';

const DEFAULT_FONT_SIZE = 16;

const WIDTH = 2; // px

const SIZE = '1'; // em
const CONTAINER_PADDING = 0; // px

const [tokensClassName, tokens] = createTheme({
  color: themeTokens.colorScheme.primary,
  color$disabled: themeTokens.colorScheme.onSurface,
  size: `${SIZE}em`,
  containerPadding: `${CONTAINER_PADDING}px`,
  widthPct: `calc((${WIDTH} / (${SIZE} * ${DEFAULT_FONT_SIZE} -
  ${CONTAINER_PADDING} * 2)) * 100)`,
});

const classNames = createStyles({
  root: {
    display: 'inline-flex',
    verticalAlign: 'middle',
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',

    // `contain` and `content-visibility` are performance optimizations
    // important here because progress indicators are often used when a cpu
    // intensive task is underway so it's especially important to minimize their
    // cpu consumption.
    contain: 'strict',
    contentVisibility: 'auto',

    width: tokens.size,
    height: tokens.size,
  },
  layer: {
    position: 'absolute',
    inset: 0,
    borderColor: 'inherit',
  },
  progress: {
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: '0%',
    alignSelf: 'stretch',
    margin: tokens.containerPadding,
  },
});

export type ICircularProgressIndicatorStylesFactory = IStylesFactory<{
  styleName: keyof typeof classNames;
  tokens: typeof tokens;
}>;

export const circularProgressIndicatorStyles =
  stylesFactory<ICircularProgressIndicatorStylesFactory>({
    classNames,
    tokensClassName,
    tokens,
  });
