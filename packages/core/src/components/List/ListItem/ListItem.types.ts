import type { IBoxProps } from '~/components/Box';
import type { IButtonBaseOwnProps } from '~/components/ButtonBase';
import type { IItemOwnProps } from '~/components/Item';
import type { IPaperOwnProps } from '~/components/Paper';
import type { IComponentThemeProps } from '~/components/ThemeProvider';
import type { IInteractionsMergeStrategy } from '~/hooks/useInteractions';
import type { IPolymorphicComponentFactory } from '~/utils/component/polymorphicComponentFactory';
import type { IListItemThemeFactory, listItemTheme } from './ListItem.css';
import { IOmit } from '~/utils/types';

export const listItemVariants = ['standard', 'danger'] as const;
export type IListItemVariant = (typeof listItemVariants)[number];

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
