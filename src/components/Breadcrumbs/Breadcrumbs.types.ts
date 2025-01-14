import type { IComponentFactory } from '~/utils/component/componentFactory';
import type { IComponentThemeProps } from '~/utils/styles/useComponentTheme';
import type { IBoxProps } from '../Box';
import type {
  breadcrumbsTheme,
  IBreadcrumbsThemeFactory,
} from './Breadcrumbs.css';

export interface IBreadcrumbsOwnProps {
  children: React.ReactNode;
  expandText?: string;
  itemCountBeforeCollapse?: number;
  itemCountAfterCollapse?: number;
  maxItems?: number;
  separator?: React.ReactNode;
  showTrailingSeparator?: boolean;
}

export interface IBreadcrumbsProps
  extends IBoxProps,
    IComponentThemeProps<IBreadcrumbsThemeFactory>,
    IBreadcrumbsOwnProps {}

export type IBreadcrumbsFactory = IComponentFactory<{
  props: IBreadcrumbsProps;
  ref: HTMLOListElement;
  theme: typeof breadcrumbsTheme;
}>;
