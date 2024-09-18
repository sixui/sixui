import type { FloatingContext, FloatingOverlayProps } from '@floating-ui/react';

import type { IPolymorphicComponentFactory } from '~/utils/component/polymorphicComponentFactory';
import type { IComponentThemeProps } from '~/utils/styles/useComponentTheme';
import type { IBoxProps } from '../Box';
import type { scrimTheme, IScrimThemeFactory } from './Scrim.css';

export type IScrimVariant = 'darken' | 'lighten';

export interface IScrimOwnProps extends FloatingOverlayProps {
  floatingContext: FloatingContext;
  children?: React.ReactNode;
}

export interface IScrimProps
  extends IBoxProps,
    IComponentThemeProps<IScrimThemeFactory>,
    IScrimOwnProps {}

export type IScrimFactory = IPolymorphicComponentFactory<{
  props: IScrimProps;
  defaultRef: HTMLDivElement;
  defaultRoot: 'div';
  theme: typeof scrimTheme;
}>;
