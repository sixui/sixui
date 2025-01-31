import type { IOrientation } from '~/utils/types';
import { createOptionalContext } from '~/utils/react/createOptionalContext';

export type IExpandableContextValue = {
  expand: (expanded: boolean) => void;
  disabled?: boolean;
  readOnly?: boolean;
  expanded?: boolean;
  defaultExpanded?: boolean;
  initiallyExpanded?: boolean;
  orientation?: IOrientation;
};

export const [ExpandableContextProvider, useExpandableContext] =
  createOptionalContext<IExpandableContextValue>();
