import type { ICssSizeValue, IOmit } from '~/helpers/types';
import type { IBaseProps } from '../Base';
import type { IExpandableContextValue } from './Expandable.context';
import type { IExpandableStylesKey } from './Expandable.styles';

export type IExpandableTriggerRenderProps = {
  expand: (expanded: boolean) => void;
  disabled?: boolean;
  expanded?: boolean;
};

export type IExpandableProps = IBaseProps<IExpandableStylesKey> &
  IOmit<IExpandableContextValue, 'expand'> & {
    trigger:
      | React.ReactNode
      | ((renderProps: IExpandableTriggerRenderProps) => React.ReactNode);
    children?: React.ReactNode;
    onChange?: (expanded: boolean) => void;
    collapsedSize?: ICssSizeValue;
  };
