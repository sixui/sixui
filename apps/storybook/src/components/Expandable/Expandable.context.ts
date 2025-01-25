import type { IOrientation } from '~/helpers/types';
import { createOptionalContext } from '~/helpers/createOptionalContext';

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
