import { Children } from 'react';

export const filterFalsyChildren = (
  children: React.ReactNode,
): Array<React.ReactElement> =>
  (Children.toArray(children) as Array<React.ReactElement>).filter(Boolean);
