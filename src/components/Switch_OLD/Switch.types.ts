import type {
  IAny,
  ICompiledStyles,
  IMaybeAsync,
  IZeroOrMore,
} from '~/helpers/types';
import type { IBaseProps } from '../Base';
import type { ICircularProgressIndicatorStylesKey } from '../CircularProgressIndicator';
import type { IFocusRingStylesKey } from '../FocusRing';
import type { IStateLayerStylesKey } from '../StateLayer';
import type { IVisualState } from '../VisualState';
import type { ISwitchStylesKey } from './Switch.styles';

export type ISwitchOwnProps = IBaseProps<ISwitchStylesKey> & {
  innerStyles?: {
    stateLayer?: IZeroOrMore<ICompiledStyles<IStateLayerStylesKey>>;
    focusRing?: IZeroOrMore<ICompiledStyles<IFocusRingStylesKey>>;
    circularProgressIndicator?: IZeroOrMore<
      ICompiledStyles<ICircularProgressIndicatorStylesKey>
    >;
  };
  visualState?: IVisualState;

  checked?: boolean;
  defaultChecked?: boolean;

  /**
   * Shows both the selected and deselected icons.
   */
  icons?: boolean;

  /**
   * Shows only the selected icon, and not the deselected icon. If `true`,
   * overrides the behavior of the `icons` property.
   */
  showOnlySelectedIcon?: boolean;

  disabled?: boolean;
  readOnly?: boolean;
  loading?: boolean;
  loadingAnimation?: 'progressIndicator' | 'none';
  onChange?: (
    event: React.ChangeEvent<HTMLInputElement>,
    value: React.InputHTMLAttributes<HTMLInputElement>['value'],
  ) => IMaybeAsync<IAny>;
  icon?: React.ReactNode;
  selectedIcon?: React.ReactNode;
  onClick?: React.MouseEventHandler<HTMLInputElement>;
};
