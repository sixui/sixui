import type { IBoxProps } from '~/components/Box';
import type { IModalAsideOwnProps } from '~/components/ModalAside';
import type { IStandardAsideOwnProps } from '~/components/StandardAside';
import type { IComponentThemeProps } from '~/components/Theme';
import type { IComponentFactory } from '~/utils/component/componentFactory';
import type { IOmit } from '~/utils/types';
import type { asideTheme, IAsideThemeFactory } from './Aside.css';

export interface IAsideOwnProps
  extends IOmit<IStandardAsideOwnProps, 'opened'>,
    IOmit<IModalAsideOwnProps, 'opened'> {
  opened?: boolean;
  modal?: boolean;
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
