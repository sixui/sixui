import type {
  IContainerProps,
  IZeroOrMore,
  ICompiledStyles,
} from '@/helpers/types';
import type { IFocusRingStylesKey } from '@/components/FocusRing';
import type { IButtonBaseStylesKey } from '@/components/ButtonBase';
import type { IBreadcrumbsStylesKey } from './Breadcrumbs.styles';

export type IBreadcrumbsProps = IContainerProps<IBreadcrumbsStylesKey> & {
  innerStyles?: {
    expandButton?: IZeroOrMore<ICompiledStyles<IButtonBaseStylesKey>>;
    expandButtonFocusRing?: IZeroOrMore<ICompiledStyles<IFocusRingStylesKey>>;
  };
  children: React.ReactNode;
  expandText?: string;
  itemCountBeforeCollapse?: number;
  itemCountAfterCollapse?: number;
  maxItems?: number;
  separator?: React.ReactNode;
  showTrailingSeparator?: boolean;
  'aria-label'?: string;
};
