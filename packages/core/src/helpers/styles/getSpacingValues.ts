import { calc } from '@vanilla-extract/css-utils';

import { px } from './px';
import { space } from './space';

const spacingSizes = [
  0, 0.5, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 12, 14, 16, 20, 24, 28, 32, 36, 40, 44,
  48, 52, 56, 60, 64, 72, 80, 96, 112, 128, 144, 160,
] as const;

export const getSpacingValues = (
  density?: string,
): Record<(typeof spacingSizes)[number], string> =>
  spacingSizes.reduce(
    (acc, size) => {
      const value = px(space(size));

      return {
        ...acc,
        [size]:
          size > 0 && density
            ? `max(${space(0.5)}, ${calc.add(value, density)})`
            : value,
      };
    },
    {} as Record<(typeof spacingSizes)[number], string>,
  );
