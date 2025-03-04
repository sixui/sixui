import { calc } from '@vanilla-extract/css-utils';

import type { ISpacingProp } from '~/components/Box';
import { themeTokens } from '~/components/Theme/theme.css';

export const space = (spacing: ISpacingProp, density?: string): string => {
  const size = spacing.startsWith('$')
    ? themeTokens.spacing[spacing.slice(1) as keyof typeof themeTokens.spacing]
    : spacing;

  return density ? `max(1px, ${calc.add(size, density)})` : size;
};
