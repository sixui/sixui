import type { ResizableProps } from 're-resizable';

import type { IBoxProps } from '~/components/Box';
import type { IComponentThemeProps } from '~/components/Theme';
import type { IComponentFactory } from '~/utils/component/componentFactory';
import type { IOrientation } from '~/utils/types';
import type { IResizableThemeFactory, resizableTheme } from './Resizable.css';

export interface IResizableOwnProps
  extends Pick<
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
  children?: React.ReactNode;
  defaultWidth?: string | number;
  defaultHeight?: string | number;
  locked?: boolean;
  orientation?: IOrientation;
  handleLocation?: 'outside' | 'center' | 'inside';
}

export interface IResizableProps
  extends IBoxProps,
    IComponentThemeProps<IResizableThemeFactory>,
    IResizableOwnProps {}

export type IResizableFactory = IComponentFactory<{
  props: IResizableProps;
  ref: HTMLDivElement;
  theme: typeof resizableTheme;
}>;
