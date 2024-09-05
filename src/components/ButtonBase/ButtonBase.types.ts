import type { PressEvent } from 'react-aria';

import type { IPolymorphicComponentFactory } from '~/utils/component/polymorphicComponentFactory';
import type { IMaybeAsync, IAny } from '~/helpers/types';
import type { IComponentThemeProps } from '~/utils/styles/useComponentTheme';
import type { IInteractions } from '~/hooks/useInteractions';
import type { IPaperOwnProps } from '../Paper';
import type {
  buttonBaseTheme,
  IButtonBaseThemeFactory,
} from './ButtonBase.css';

export type IButtonBaseOwnProps = {
  interactions?: IInteractions;
  children?: React.ReactNode;
  inwardFocusRing?: boolean;
  href?: string;
  target?: React.AnchorHTMLAttributes<HTMLAnchorElement>['target'];
  rel?: string;
  disabled?: boolean;
  onPress?: (event: PressEvent) => IMaybeAsync<IAny>;

  /**
   * @deprecated Use `onPress` instead.
   */
  onClick?: (event: React.MouseEvent<Element>) => IMaybeAsync<IAny>;

  /**
   * If `true`, the component will be rendered in a disabled state, but will
   * still be focusable.
   */
  readOnly?: boolean;

  type?: string;
};

export interface IButtonBaseProps
  extends IPaperOwnProps,
    IButtonBaseOwnProps,
    IComponentThemeProps<IButtonBaseThemeFactory> {}

export type IButtonBaseFactory = IPolymorphicComponentFactory<{
  props: IButtonBaseProps;
  defaultRef: HTMLDivElement;
  defaultRoot: 'div';
  theme: typeof buttonBaseTheme;
}>;
