import type {
  IContainerProps,
  IZeroOrMore,
  ICompiledStyles,
  IAny,
  IMaybeAsync,
  IOmit,
} from '~/helpers/types';
import type { IPolymorphicComponentPropsWithRef } from '~/helpers/react/polymorphicComponentTypes';
import type { IStateLayerStylesKey } from '~/components/StateLayer';
import type { IFocusRingStylesKey } from '~/components/FocusRing';
import type { ICircularProgressIndicatorStylesKey } from '~/components/CircularProgressIndicator';
import type { IVisualState } from '~/components/VisualState';
import type { IRadioStylesKey } from './Radio.styles';

export const RADIO_DEFAULT_TAG = 'input';

export type IRadioOwnProps = IContainerProps<IRadioStylesKey> &
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

export type IRadioProps<
  TRoot extends React.ElementType = typeof RADIO_DEFAULT_TAG,
> = IPolymorphicComponentPropsWithRef<TRoot, IRadioOwnProps>;
