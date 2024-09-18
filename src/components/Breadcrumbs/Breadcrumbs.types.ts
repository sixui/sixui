import type { ICompiledStyles, IOmit, IZeroOrMore } from '~/helpers/types';
import type { IBaseProps } from '../Base';
import type { IButtonBaseStylesKey } from '../ButtonBase';
import type { IFocusRingStylesKey } from '../FocusRing';
import type { IBreadcrumbsStylesKey } from './Breadcrumbs.styles';
import { IStackProps } from '../Stack';

export type IBreadcrumbsProps = IBaseProps<IBreadcrumbsStylesKey> &
  IOmit<IStackProps, 'styles'> & {
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
