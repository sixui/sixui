import type { IBoxProps } from '~/components/Box';
import type { IComponentThemeProps } from '~/components/ThemeProvider';
import type { IPolymorphicComponentFactory } from '~/utils/component/polymorphicComponentFactory';
import type {
  IOverlayableThemeFactory,
  overlayableTheme,
} from './Overlayable.css';

export interface IOverlayableOwnProps {
  children: React.ReactNode;
  overlay: React.ReactNode;
  visible?: boolean;
  keepContentVisible?: boolean;
}

export interface IOverlayableProps
  extends IBoxProps,
    IComponentThemeProps<IOverlayableThemeFactory>,
    IOverlayableOwnProps {}

export type IOverlayableFactory = IPolymorphicComponentFactory<{
  props: IOverlayableProps;
  defaultRef: HTMLDivElement;
  defaultRoot: 'div';
  theme: typeof overlayableTheme;
}>;
