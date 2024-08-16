import type { IBaseProps } from '../Base';
import type { IPortalProps } from '../Portal';
import type { IDrawerStylesKey } from './Drawer.styles';

export type IDrawerVariant = 'standard' | 'detached';

export type IDrawerChildrenRenderProps = {
  close: (event?: React.MouseEvent) => void;
};

export type IDrawerProps = Pick<IPortalProps, 'root'> &
  IBaseProps<IDrawerStylesKey> & {
    opened?: boolean;
    defaultOpened?: boolean;
    onClose?: () => void;
    disabled?: boolean;
    anchor?: 'left' | 'right' | 'top' | 'bottom';
    children:
      | ((renderProps: IDrawerChildrenRenderProps) => React.ReactNode)
      | React.ReactNode;
    variant?: IDrawerVariant;
  };
