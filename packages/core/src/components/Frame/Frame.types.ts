import type { IBoxProps } from '~/components/Box';
import type { IComponentFactory } from '~/utils/component/componentFactory';

export type IFrameChildrenRenderProps = {
  window: Window;
};

export interface IFrameOwnProps {
  children:
    | React.ReactNode
    | ((props: IFrameChildrenRenderProps) => React.ReactNode);
  importParentStyles?: boolean;
}

export interface IFrameProps extends IBoxProps, IFrameOwnProps {}

export type IFrameFactory = IComponentFactory<{
  props: IFrameProps;
  ref: HTMLIFrameElement;
}>;
