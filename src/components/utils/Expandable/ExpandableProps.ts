import type { IContainerProps, ICssSizeValue, IOmit } from '@/helpers/types';
import type { IExpandableContextValue } from './ExpandableContext';

export type IExpandableTriggerRenderProps = {
  expand: (expanded: boolean) => void;
  disabled?: boolean;
  expanded?: boolean;
};

export type IExpandableProps = IContainerProps &
  IOmit<IExpandableContextValue, 'expand'> & {
    trigger:
      | React.ReactNode
      | ((renderProps: IExpandableTriggerRenderProps) => React.ReactNode);
    children?: React.ReactNode;
    onChange?: (expanded: boolean) => void;
    collapsedSize?: ICssSizeValue;
  };
