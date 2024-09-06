import { px } from './px';
import { space } from './space';

const spacingSizes = [
  0, 0.5, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 12, 14, 16, 20, 24, 28, 32, 36, 40, 44,
  48, 52, 56, 60, 64, 72, 80, 96,
] as const;

export const spacingValues = spacingSizes.reduce(
  (acc, size) => ({ ...acc, [size]: px(space(size)) }),
  {} as Record<(typeof spacingSizes)[number], string>,
);
