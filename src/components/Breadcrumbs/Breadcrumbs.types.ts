import type { IZeroOrMore, ICompiledStyles } from '~/helpers/types';
import type { IBaseProps } from '../Base';
import type { IFocusRingStylesKey } from '../FocusRing';
import type { IButtonBaseStylesKey } from '../ButtonBase';
import type { IBreadcrumbsStylesKey } from './Breadcrumbs.styles';

export type IBreadcrumbsProps = IBaseProps<IBreadcrumbsStylesKey> & {
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
