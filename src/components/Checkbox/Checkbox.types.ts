import { IBaseProps } from '../Base';
import type {
  IZeroOrMore,
  ICompiledStyles,
  IMaybeAsync,
  IAny,
  IOmit,
} from '~/helpers/types';
import type { ICheckboxStylesKey } from './Checkbox.styles';
import type { IStateLayerStylesKey } from '../StateLayer';
import type { IFocusRingStylesKey } from '../FocusRing';
import type { ICircularProgressIndicatorStylesKey } from '../CircularProgressIndicator';
import type { IVisualState } from '../VisualState';

export type ICheckboxProps = IBaseProps<ICheckboxStylesKey> &
  IOmit<
    React.ComponentPropsWithoutRef<'input'>,
    'defaultValue' | 'onChange'
  > & {
    innerStyles?: {
      stateLayer?: IZeroOrMore<ICompiledStyles<IStateLayerStylesKey>>;
      focusRing?: IZeroOrMore<ICompiledStyles<IFocusRingStylesKey>>;
      circularProgressIndicator?: IZeroOrMore<
        ICompiledStyles<ICircularProgressIndicatorStylesKey>
      >;
    };
    visualState?: IVisualState;
    indeterminate?: boolean;
    defaultIndeterminate?: boolean;
    onChange?: (
      event: React.ChangeEvent<HTMLInputElement>,
      value: React.InputHTMLAttributes<HTMLInputElement>['value'],
    ) => IMaybeAsync<IAny>;
    loading?: boolean;

    /**
     * If `true`, the component will be rendered in a disabled state, but will
     * still be focusable.
     */
    softDisabled?: boolean;
  };
