import type { IBoxProps } from '~/components/Box';
import type { IFrameOwnProps } from '~/components/Frame';
import type { IResizableOwnProps } from '~/components/Resizable';
import type { IComponentThemeProps } from '~/components/Theme';
import type { IComponentFactory } from '~/utils/component/componentFactory';
import type { IOmit } from '~/utils/types';
import type {
  IScreenFrameThemeFactory,
  screenFrameTheme,
} from './ScreenFrame.css';

export type IScreenFrameOwnProps = Pick<IFrameOwnProps, 'children'> &
  IOmit<IResizableOwnProps, 'className' | 'style' | 'scale' | 'children'>;

export interface IScreenFrameProps
  extends IBoxProps,
    IComponentThemeProps<IScreenFrameThemeFactory>,
    IScreenFrameOwnProps {}

export type IScreenFrameFactory = IComponentFactory<{
  props: IScreenFrameProps;
  ref: HTMLIFrameElement;
  theme: typeof screenFrameTheme;
}>;
