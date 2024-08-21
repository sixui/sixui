import type { IBaseProps } from '~/components/Base';
import type { ICompiledStyles, IOmit, IZeroOrMore } from '~/helpers/types';
import type {
  ISideSheetContentProps,
  ISideSheetContentStylesKey,
} from '../SideSheetContent';
import type { INavigationDrawerContentStylesKey } from './NavigationDrawerContent.styles';

export type INavigationDrawerContentProps =
  IBaseProps<INavigationDrawerContentStylesKey> &
    IOmit<ISideSheetContentProps, 'styles'> & {
      innerStyles?: ISideSheetContentProps['styles'] & {
        sideSheetContent?: IZeroOrMore<
          ICompiledStyles<ISideSheetContentStylesKey>
        >;
      };
    };
