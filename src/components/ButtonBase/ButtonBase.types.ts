import type { PressEvent } from 'react-aria';

import type { IPolymorphicComponentFactory } from '~/utils/component/polymorphicComponentFactory';
import type { IMaybeAsync, IAny } from '~/helpers/types';
import type { IComponentThemeProps } from '~/utils/styles/useComponentTheme';
import type { IInteractions } from '~/hooks/useInteractions';
import type { IUseStateLayerResult } from '../StateLayer';
import type { IPaperOwnProps } from '../Paper';
import type { IFocusRingVariant } from '../FocusRing';
import type { IBoxProps } from '../Box';
import type {
  buttonBaseTheme,
  IButtonBaseThemeFactory,
} from './ButtonBase.css';

export interface IButtonBaseOwnProps {
  interactions?: IInteractions;
  children?: React.ReactNode;
  focusRing?: IFocusRingVariant | false;
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
  stateLayer?: IUseStateLayerResult;
}

export interface IButtonBaseProps
  extends IBoxProps,
    IPaperOwnProps,
    IButtonBaseOwnProps,
    IComponentThemeProps<IButtonBaseThemeFactory> {}

export type IButtonBaseFactory = IPolymorphicComponentFactory<{
  props: IButtonBaseProps;
  defaultRef: HTMLDivElement;
  defaultRoot: 'div';
  theme: typeof buttonBaseTheme;
}>;
