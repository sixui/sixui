import type { ResizableProps } from 're-resizable';

import type { IBoxProps } from '~/components/Box';
import type { IFrameOwnProps } from '~/components/Frame';
import type { IComponentThemeProps } from '~/components/Theme';
import type { IComponentFactory } from '~/utils/component/componentFactory';
import type {
  IScreenFrameThemeFactory,
  screenFrameTheme,
} from './ScreenFrame.css';

export interface IScreenFrameOwnProps
  extends Pick<IFrameOwnProps, 'children'>,
    Pick<
      ResizableProps,
      | 'size'
      | 'minWidth'
      | 'minHeight'
      | 'maxWidth'
      | 'maxHeight'
      | 'grid'
      | 'gridGap'
      | 'snap'
      | 'snapGap'
      | 'lockAspectRatio'
    > {
  defaultWidth?: string | number;
  defaultHeight?: string | number;
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
