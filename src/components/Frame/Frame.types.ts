import type { IBaseProps } from '../Base';

export type IFrameRenderProps = {
  window: Window;
};

export type IFrameProps = Omit<IBaseProps, 'children'> &
  Omit<React.ComponentPropsWithoutRef<'iframe'>, 'children'> & {
    children: React.ReactNode | ((props: IFrameRenderProps) => React.ReactNode);
    importParentStyles?: boolean;
  };
