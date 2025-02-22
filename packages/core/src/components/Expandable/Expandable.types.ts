import type { IBoxProps } from '~/components/Box';
import type { IComponentThemeProps } from '~/components/Theme';
import type { IComponentFactory } from '~/utils/component/componentFactory';
import type { ICssSizeValue, IOmit } from '~/utils/types';
import type { IExpandableContextValue } from './Expandable.context';
import type {
  expandableTheme,
  IExpandableThemeFactory,
} from './Expandable.css';

export type IExpandableTriggerRenderProps = {
  expand: (expanded: boolean) => void;
  disabled?: boolean;
  expanded?: boolean;
};

export interface IExpandableOwnProps
  extends IOmit<IExpandableContextValue, 'expand'> {
  children?: React.ReactNode;
  trigger?:
    | React.ReactNode
    | ((renderProps: IExpandableTriggerRenderProps) => React.ReactNode);
  onChange?: (expanded: boolean) => void;
  collapsedSize?: ICssSizeValue;
}

export interface IExpandableProps
  extends IBoxProps,
    IComponentThemeProps<IExpandableThemeFactory>,
    IExpandableOwnProps {}

export type IExpandableFactory = IComponentFactory<{
  props: IExpandableProps;
  ref: HTMLDivElement;
  theme: typeof expandableTheme;
}>;
