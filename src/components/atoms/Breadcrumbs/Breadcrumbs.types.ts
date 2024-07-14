import type {
  IContainerProps,
  IZeroOrMore,
  ICompiledStyles,
} from '@/helpers/types';
import type { IFocusRingStyleKey } from '@/components/utils/FocusRing';
import type { IButtonBaseStylesKey } from '@/components/atoms/ButtonBase';
import type { IBreadcrumbsStylesKey } from './Breadcrumbs.styles';

export type IBreadcrumbsProps = IContainerProps<IBreadcrumbsStylesKey> & {
  innerStyles?: {
    expandButton?: IZeroOrMore<ICompiledStyles<IButtonBaseStylesKey>>;
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
