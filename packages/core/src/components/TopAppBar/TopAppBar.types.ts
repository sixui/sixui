import type { IBoxProps } from '~/components/Box';
import type { IPaperOwnProps } from '~/components/Paper';
import type { IComponentThemeProps } from '~/components/Theme';
import type { IPolymorphicComponentFactory } from '~/utils/component';
import type { ITopAppBarThemeFactory, topAppBarTheme } from './TopAppBar.css';

export const topAppBarVariants = [
  'centerAligned',
  'small',
  'medium',
  'large',
] as const;
export type ITopAppBarVariant = (typeof topAppBarVariants)[number];

export interface ITopAppBarOwnProps extends IPaperOwnProps {
  headline?: React.ReactNode;
  leadingNavigation?: React.ReactNode;
  trailingActions?:
    | React.ReactNode
    | (({ consolidated }: { consolidated: boolean }) => React.ReactNode);
  scrolling?: boolean;
}

export interface ITopAppBarProps
  extends IBoxProps,
    IComponentThemeProps<ITopAppBarThemeFactory>,
    ITopAppBarOwnProps {}

export type ITopAppBarFactory = IPolymorphicComponentFactory<{
  props: ITopAppBarProps;
  defaultRef: HTMLDivElement;
  defaultRoot: 'div';
  theme: typeof topAppBarTheme;
  variant: ITopAppBarVariant | false;
}>;
