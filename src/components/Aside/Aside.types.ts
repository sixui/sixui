import type { IOmit } from '~/helpers/types';
import type { IComponentFactory } from '~/utils/component/componentFactory';
import type { IComponentThemeProps } from '~/utils/styles/useComponentTheme';
import type { IBoxProps } from '../Box';
import type { IModalAsideOwnProps } from '../ModalAside';
import type { IStandardAsideOwnProps } from '../StandardAside';
import type { asideTheme, IAsideThemeFactory } from './Aside.css';

export interface IAsideOwnProps
  extends IOmit<IStandardAsideOwnProps, 'opened'>,
    IOmit<IModalAsideOwnProps, 'opened'> {
  standardOpened?: boolean;
  modalOpened?: boolean;
  modalRef?: React.RefObject<HTMLDivElement>;
}

export interface IAsideProps
  extends IBoxProps,
    IComponentThemeProps<IAsideThemeFactory>,
    IAsideOwnProps {}

export type IAsideFactory = IComponentFactory<{
  props: IAsideProps;
  ref: HTMLDivElement;
  theme: typeof asideTheme;
}>;
