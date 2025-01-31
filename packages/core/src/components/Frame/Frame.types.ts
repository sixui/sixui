import type { IBoxProps } from '~/components/Box';
import type { IComponentThemeProps } from '~/components/ThemeProvider';
import type { IComponentFactory } from '~/utils/component/componentFactory';
import type { IElementProps } from '~/utils/types';
import type { frameTheme, IFrameThemeFactory } from './Frame.css';

export type IFrameRenderProps = {
  window: Window;
};

export interface IFrameOwnProps
  extends IElementProps<'iframe', 'className' | 'children'> {
  children: React.ReactNode | ((props: IFrameRenderProps) => React.ReactNode);
  importParentStyles?: boolean;
}

export interface IFrameProps
  extends IBoxProps,
    IComponentThemeProps<IFrameThemeFactory>,
    IFrameOwnProps {}

export type IFrameFactory = IComponentFactory<{
  props: IFrameProps;
  ref: HTMLIFrameElement;
  theme: typeof frameTheme;
}>;
