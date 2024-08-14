import type { IBaseProps } from '../Base';

export type IFrameProps = IBaseProps &
  React.ComponentPropsWithoutRef<'iframe'> & {
    children: React.ReactNode;
    importParentStyles?: boolean;
  };
