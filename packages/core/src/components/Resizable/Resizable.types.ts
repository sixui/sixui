import type { Resizable, ResizableProps } from 're-resizable';

import type { IOrientation } from '~/utils/types';
import type { resizableTheme } from './Resizable.css';
import { IPolymorphicComponentFactory } from '~/utils/component';

export interface IResizableOwnProps
  extends Pick<
    ResizableProps,
    | 'className'
    | 'style'
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

export type IResizableProps = IResizableOwnProps;

export type IResizableFactory = IPolymorphicComponentFactory<{
  props: IResizableProps;
  defaultRef: Resizable;
  defaultRoot: Resizable;
  theme: typeof resizableTheme;
}>;
