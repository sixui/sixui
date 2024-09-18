import type { IBaseProps } from '~/components/Base';
import type { IAppLayoutSideSheetStylesKey } from './AppLayoutSideSheet.styles';

export type IAppLayoutSideSheetProps =
  IBaseProps<IAppLayoutSideSheetStylesKey> & {
    children?: React.ReactNode;
    fullHeight?: boolean;
    anchor?: 'left' | 'right';
  };
