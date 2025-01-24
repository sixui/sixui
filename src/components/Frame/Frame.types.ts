import type { IBoxProps } from '~/components/Box';
import type { IElementProps } from '~/helpers/types';
import type { IComponentFactory } from '~/utils/component/componentFactory';
import type { IComponentThemeProps } from '~/utils/styles/useComponentTheme';
import type { frameTheme, IFrameThemeFactory } from './Frame.css';

export type IFrameRenderProps = {
  window: Window;
};

export interface IFrameOwnProps {
  children: React.ReactNode | ((props: IFrameRenderProps) => React.ReactNode);
  importParentStyles?: boolean;
}

export interface IFrameProps
  extends IBoxProps,
    IComponentThemeProps<IFrameThemeFactory>,
    IElementProps<'iframe', 'className' | 'children'>,
    IFrameOwnProps {}

export type IFrameFactory = IComponentFactory<{
  props: IFrameProps;
  ref: HTMLIFrameElement;
  theme: typeof frameTheme;
}>;
