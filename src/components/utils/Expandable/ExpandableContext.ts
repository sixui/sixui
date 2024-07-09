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

const stub = (): never => {
  throw new Error(
    'You forgot to wrap your component in <ExpandableContext.Provider />.',
  );
};

export const ExpandableContext = createContext<IExpandableContextValue>({
  expand: stub,
});
