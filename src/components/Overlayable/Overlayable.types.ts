import type { IComponentFactory } from '~/utils/component/componentFactory';
import type { IComponentThemeProps } from '~/utils/styles/useComponentTheme';
import type { IBoxProps } from '../Box';
import type {
  IOverlayableThemeFactory,
  overlayableTheme,
} from './Overlayable.css';

export type IOverlayableVariant = 'primary';

export interface IOverlayableOwnProps {
  children: React.ReactNode;
  overlay: React.ReactNode;
  visible?: boolean;
}

export interface IOverlayableProps
  extends IBoxProps,
    IComponentThemeProps<IOverlayableThemeFactory>,
    IOverlayableOwnProps {}

export type IOverlayableFactory = IComponentFactory<{
  props: IOverlayableProps;
  ref: HTMLDivElement;
  theme: typeof overlayableTheme;
  variant: IOverlayableVariant | false;
}>;
