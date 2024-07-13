import type {
  IContainerProps,
  IZeroOrMore,
  ICompiledStyles,
} from '@/helpers/types';
import type { IFocusRingStyleKey } from '@/components/utils/FocusRing';
import type { IButtonBaseStyleKey } from '@/components/atoms/ButtonBase';
import type { IBreadcrumbsStyleKey } from './Breadcrumbs.styles';

export type IBreadcrumbsProps = IContainerProps<IBreadcrumbsStyleKey> & {
  innerStyles?: {
    expandButton?: IZeroOrMore<ICompiledStyles<IButtonBaseStyleKey>>;
    expandButtonFocusRing?: IZeroOrMore<ICompiledStyles<IFocusRingStyleKey>>;
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
