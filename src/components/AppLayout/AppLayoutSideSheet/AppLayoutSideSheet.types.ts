import type { IAppLayoutSideSheetStylesKey } from './AppLayoutSideSheet.styles';
import type { IBaseProps } from '~/components/Base';

export type IAppLayoutSideSheetProps =
  IBaseProps<IAppLayoutSideSheetStylesKey> & {
    children?: React.ReactNode;
    fullHeight?: boolean;
    anchor?: 'left' | 'right';
  };
