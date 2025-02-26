import type { IBoxProps } from '~/components/Box';
import type { IPaperOwnProps } from '~/components/Paper';
import type { IComponentThemeProps } from '~/components/Theme';
import type { IComponentFactory } from '~/utils/component/componentFactory';
import type { fileCardTheme, IFileCardThemeFactory } from './FileCard.css';

export interface IFileCardOwnProps extends IPaperOwnProps {
  children?: React.ReactNode;
  disabled?: boolean;
}

export interface IFileCardProps
  extends IBoxProps,
    IComponentThemeProps<IFileCardThemeFactory>,
    IFileCardOwnProps {}

export type IFileCardFactory = IComponentFactory<{
  props: IFileCardProps;
  ref: HTMLDivElement;
  theme: typeof fileCardTheme;
}>;
