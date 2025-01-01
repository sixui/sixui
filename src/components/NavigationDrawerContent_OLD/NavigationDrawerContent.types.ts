import type { IBaseProps } from '~/components/Base';
import type { ICompiledStyles, IOmit, IZeroOrMore } from '~/helpers/types';
import type {
  ISideSheetContentProps,
  ISideSheetContentStylesKey,
  ISideSheetContentVariant,
} from '../SideSheetContent';
import type { INavigationDrawerContentStylesKey } from './NavigationDrawerContent.styles';

export type INavigationDrawerContentVariant = ISideSheetContentVariant;

export type INavigationDrawerContentProps =
  IBaseProps<INavigationDrawerContentStylesKey> &
    IOmit<ISideSheetContentProps, 'styles'> & {
      innerStyles?: ISideSheetContentProps['styles'] & {
        sideSheetContent?: IZeroOrMore<
          ICompiledStyles<ISideSheetContentStylesKey>
        >;
      };
    };
