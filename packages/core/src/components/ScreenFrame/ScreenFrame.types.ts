import type { IBoxProps } from '~/components/Box';
import type { IFrameOwnProps } from '~/components/Frame';
import type { IComponentThemeProps } from '~/components/Theme';
import type { IComponentFactory } from '~/utils/component/componentFactory';
import type {
  IScreenFrameThemeFactory,
  screenFrameTheme,
} from './ScreenFrame.css';

export interface IScreenFrameOwnProps extends IFrameOwnProps {
  resizable?: boolean | 'horizontal' | 'vertical';
  minSize?: number;
  maxSize?: number;
  aspectRatio?: number;
  keepAspectRatio?: boolean;
}

export interface IScreenFrameProps
  extends IBoxProps,
    IComponentThemeProps<IScreenFrameThemeFactory>,
    IScreenFrameOwnProps {}

export type IScreenFrameFactory = IComponentFactory<{
  props: IScreenFrameProps;
  ref: HTMLIFrameElement;
  theme: typeof screenFrameTheme;
}>;
