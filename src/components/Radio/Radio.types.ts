import type {
  IZeroOrMore,
  ICompiledStyles,
  IAny,
  IMaybeAsync,
  IOmit,
} from '~/helpers/types';
import type { IBaseProps } from '../Base';
import type { IStateLayerStylesKey } from '../StateLayer';
import type { IFocusRingStylesKey } from '../FocusRing';
import type { ICircularProgressIndicatorStylesKey } from '../CircularProgressIndicator';
import type { IVisualState } from '../VisualState';
import type { IRadioStylesKey } from './Radio.styles';

export type IRadioProps = IBaseProps<IRadioStylesKey> &
  IOmit<React.ComponentPropsWithoutRef<'input'>, 'onChange'> & {
    innerStyles?: {
      stateLayer?: IZeroOrMore<ICompiledStyles<IStateLayerStylesKey>>;
      focusRing?: IZeroOrMore<ICompiledStyles<IFocusRingStylesKey>>;
      circularProgressIndicator?: IZeroOrMore<
        ICompiledStyles<ICircularProgressIndicatorStylesKey>
      >;
    };
    visualState?: IVisualState;
    checked?: boolean;
    value?: string;
    onChange?: (
      event: React.ChangeEvent<HTMLInputElement>,
      value: string | undefined,
    ) => IMaybeAsync<IAny>;
    loading?: boolean;

    /**
     * If `true`, the component will be rendered in a disabled state, but will
     * still be focusable.
     */
    softDisabled?: boolean;
  };
