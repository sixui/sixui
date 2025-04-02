import type { IBoxProps } from '~/components/Box';
import type { IButtonBaseOwnProps } from '~/components/ButtonBase';
import type { IItemOwnProps } from '~/components/Item';
import type { IPaperOwnProps } from '~/components/Paper';
import type { IComponentThemeProps } from '~/components/Theme';
import type { IInteractionsMergeStrategy } from '~/hooks/useInteractions';
import type { IPolymorphicComponentFactory } from '~/utils/component/polymorphicComponentFactory';
import type { IOmit } from '~/utils/types';
import type { IListItemOwnProps } from '../ListItem';
import type {
  IListItemButtonThemeFactory,
  listItemButtonTheme,
} from './ListItemButton.css';

export const listItemButtonVariants = ['standard', 'danger'] as const;
export type IListItemButtonVariant = (typeof listItemButtonVariants)[number];

export interface IListItemButtonOwnProps
  extends IItemOwnProps,
    IPaperOwnProps,
    IListItemOwnProps,
    IOmit<IButtonBaseOwnProps, 'children'> {
  interactionsMergeStrategy?: IInteractionsMergeStrategy;
  noFocusRing?: boolean;
}

export interface IListItemButtonProps
  extends IBoxProps,
    IComponentThemeProps<IListItemButtonThemeFactory>,
    IListItemButtonOwnProps {}

export type IListItemButtonFactory = IPolymorphicComponentFactory<{
  props: IListItemButtonProps;
  defaultRef: HTMLDivElement;
  defaultRoot: 'div';
  theme: typeof listItemButtonTheme;
  variant: IListItemButtonVariant;
}>;
