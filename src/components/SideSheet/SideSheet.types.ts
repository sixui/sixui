import type { ICompiledStyles, IOmit, IZeroOrMore } from '~/helpers/types';
import type {
  ISideSheetContentProps,
  ISideSheetContentStylesKey,
} from '../SideSheetContent';
import type { IBaseProps } from '../Base';
import type { IPortalProps } from '../Portal';
import type { IDrawerProps } from '../Drawer';
import type { ISideSheetStylesKey } from './SideSheet.styles';

export type ISideSheetProps = Pick<IPortalProps, 'root'> &
  IBaseProps<ISideSheetStylesKey> &
  IOmit<IDrawerProps, 'styles' | 'children'> &
  IOmit<ISideSheetContentProps, 'styles' | 'variant'> & {
    innerStyles?: {
      sideSheetContent?: IZeroOrMore<
        ICompiledStyles<ISideSheetContentStylesKey>
      >;
    };
  };
