import type { IContainerProps, ICssSizeValue, IOmit } from '~/helpers/types';
import type { IExpandableContextValue } from './ExpandableContext';
import type { IExpandableStylesKey } from './Expandable.styles';

export type IExpandableTriggerRenderProps = {
  expand: (expanded: boolean) => void;
  disabled?: boolean;
  expanded?: boolean;
};

export type IExpandableProps = IContainerProps &
  IContainerProps<IExpandableStylesKey> &
  IOmit<IExpandableContextValue, 'expand'> & {
    trigger:
      | React.ReactNode
      | ((renderProps: IExpandableTriggerRenderProps) => React.ReactNode);
    children?: React.ReactNode;
    onChange?: (expanded: boolean) => void;
    collapsedSize?: ICssSizeValue;
  };
