import { calc } from '@vanilla-extract/css-utils';

import { themeTokens } from '~/components/Theme';

export const zIndex = (value: number): string =>
  calc.add(themeTokens.zIndex.app, value);
