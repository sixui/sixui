import type { IOrientation } from '~/helpers/types';
import { createSafeContext } from '~/helpers/createSafeContext';

export type IExpandableContextValue = {
  expand: (expanded: boolean) => void;
  disabled?: boolean;
  expanded?: boolean;
  defaultExpanded?: boolean;
  initiallyExpanded?: boolean;
  orientation?: IOrientation;
};

export const [ExpandableContextProvider, useExpandableContext] =
  createSafeContext<IExpandableContextValue>(
    'You forgot to wrap your component in <ExpandableContextProvider />.',
  );
