import type { IInteractionsMergeStrategy } from '~/hooks/useInteractions';
import type { IPolymorphicComponentFactory } from '~/utils/component/polymorphicComponentFactory';
import type { IComponentThemeProps } from '~/utils/styles/useComponentTheme';
import type { IBoxProps } from '../Box';
import type { IButtonBaseOwnProps } from '../ButtonBase';
import type { IItemOwnProps } from '../Item';
import type { IPaperOwnProps } from '../Paper';
import type { IListItemThemeFactory, listItemTheme } from './ListItem.css';
import { IOmit } from '~/helpers/types';

export type IListItemVariant = 'standard' | 'danger';

export interface IListItemOwnProps
  extends IItemOwnProps,
    IPaperOwnProps,
    IOmit<IButtonBaseOwnProps, 'children'> {
  interactionsMergeStrategy?: IInteractionsMergeStrategy;
  selected?: boolean;
  loading?: boolean;
  leading?: React.ReactNode;
  leadingIcon?: React.ReactNode;
  leadingImage?: string;
  leadingVideo?: Array<{ type: string; src: string }>;
  trailing?: React.ReactNode;
  trailingIcon?: React.ReactNode;
  noFocusRing?: boolean;
  lineClamp?: number;
}

export interface IListItemProps
  extends IBoxProps,
    IComponentThemeProps<IListItemThemeFactory>,
    IListItemOwnProps {}

export type IListItemFactory = IPolymorphicComponentFactory<{
  props: IListItemProps;
  defaultRef: HTMLDivElement;
  defaultRoot: 'div';
  theme: typeof listItemTheme;
  variant: IListItemVariant;
}>;
