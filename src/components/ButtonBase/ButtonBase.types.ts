import type { IPolymorphicComponentFactory } from '~/utils/component/polymorphicComponentFactory';
import type { IMaybeAsync, IAny } from '~/helpers/types';
import type { IStylesProps } from '~/utils/styles/useStyles';
import type { IInteractions } from '~/hooks/useInteractions';
import type { IBoxProps } from '../Box';
import type {
  buttonBaseStyles,
  IButtonBaseStylesFactory,
} from './ButtonBase.css';

export type IButtonBaseOwnProps = {
  interactions?: IInteractions;
  children?: React.ReactNode;
  inwardFocusRing?: boolean;
  href?: string;
  target?: React.AnchorHTMLAttributes<HTMLAnchorElement>['target'];
  rel?: string;
  disabled?: boolean;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => IMaybeAsync<IAny>;

  /**
   * If `true`, the component will be rendered in a disabled state, but will
   * still be focusable.
   */
  readOnly?: boolean;

  type?: string;
};

export interface IButtonBaseProps
  extends IBoxProps,
    IButtonBaseOwnProps,
    IStylesProps<IButtonBaseStylesFactory> {}

export type IButtonBaseFactory = IPolymorphicComponentFactory<{
  props: IButtonBaseProps;
  defaultRef: HTMLDivElement;
  defaultRoot: 'div';
  styles: typeof buttonBaseStyles;
}>;
