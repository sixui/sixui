import type { IAvatarProps } from '~/components/Avatar';
import type { IBoxProps } from '~/components/Box';
import type { IPaperOwnProps } from '~/components/Paper';
import type { IComponentThemeProps } from '~/components/Theme';
import type { IInteractionsMergeStrategy } from '~/hooks';
import type { IComponentFactory } from '~/utils/component/componentFactory';
import type { IElementProps } from '~/utils/types';
import type { ISearchBarThemeFactory, searchBarTheme } from './SearchBar.css';

export interface ISearchBarOwnProps
  extends IPaperOwnProps,
    IElementProps<'input', 'className'> {
  interactionsMergeStrategy?: IInteractionsMergeStrategy;
  wrapperProps?: React.HTMLAttributes<HTMLDivElement>;
  rootRef?: React.Ref<HTMLDivElement>;
  leadingIcon?: React.ReactNode;
  trailingActions?: React.ReactNode;
  trailingAvatarProps?: IAvatarProps;
  loading?: boolean;
}

export interface ISearchBarProps
  extends IBoxProps,
    IComponentThemeProps<ISearchBarThemeFactory>,
    ISearchBarOwnProps {}

export type ISearchBarFactory = IComponentFactory<{
  props: ISearchBarProps;
  ref: HTMLInputElement;
  theme: typeof searchBarTheme;
}>;
