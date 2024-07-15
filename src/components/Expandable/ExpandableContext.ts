import { createContext } from 'react';

import type { IOrientation } from '@/helpers/types';

export type IExpandableContextValue = {
  expand: (expanded: boolean) => void;
  disabled?: boolean;
  expanded?: boolean;
  defaultExpanded?: boolean;
  initiallyExpanded?: boolean;
  orientation?: IOrientation;
};

export const ExpandableContext = createContext<
  IExpandableContextValue | undefined
>(undefined);
