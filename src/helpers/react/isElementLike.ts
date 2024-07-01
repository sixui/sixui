import { getDisplayName } from '@/helpers/react/getDisplayName';
import { isProduction } from '@olivierpascal/helpers';

import { isFragment } from './isFragment';

export const isElementLike = <TElement extends React.ReactElement>(
  element: React.ReactElement,
  expectedDisplayName: string,
): element is TElement => {
  if (!isProduction() && isFragment(element)) {
    // eslint-disable-next-line no-console
    console.error(
      "sixui: A component doesn't accept a Fragment as a child. Consider providing an array instead.",
    );
  }

  const elementDisplayName = getDisplayName(element);
  const isLike =
    elementDisplayName !== undefined &&
    elementDisplayName === expectedDisplayName;

  return isLike;
};
