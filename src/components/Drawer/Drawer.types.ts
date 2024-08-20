import type { IBaseProps } from '../Base';
import type { IPortalProps } from '../Portal';
import type { IDrawerStylesKey } from './Drawer.styles';

export type IDrawerChildrenRenderProps = {
  close: (event?: React.MouseEvent) => void;
};

export type IDrawerProps = IBaseProps<IDrawerStylesKey> &
  Pick<IPortalProps, 'root'> & {
    opened?: boolean;
    defaultOpened?: boolean;
    onClose?: () => void;
    disabled?: boolean;
    anchor?: 'left' | 'right' | 'top' | 'bottom';
    children:
      | ((renderProps: IDrawerChildrenRenderProps) => React.ReactNode)
      | React.ReactNode;
    detached?: boolean;
  };
