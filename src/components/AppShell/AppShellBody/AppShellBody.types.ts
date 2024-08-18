import type { IAppShellBodyStylesKey } from './AppShellBody.styles';
import type { IBaseProps } from '~/components/Base';

export type IAppShellBodyProps = IBaseProps<IAppShellBodyStylesKey> & {
  children?: React.ReactNode;
  hasLeftSideSheet?: boolean;
  leftSideSheetOpened?: boolean;
  hasRightSideSheet?: boolean;
  rightSideSheetOpened?: boolean;
};
