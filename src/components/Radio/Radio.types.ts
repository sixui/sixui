import type {
  IContainerProps,
  IZeroOrMore,
  ICompiledStyles,
  IAny,
  IMaybeAsync,
} from '~/helpers/types';
import type { IPolymorphicComponentPropsWithRef } from '~/helpers/react/polymorphicComponentTypes';
import type { IStateLayerStylesKey } from '~/components/StateLayer';
import type { IFocusRingStylesKey } from '~/components/FocusRing';
import type { ICircularProgressIndicatorStylesKey } from '~/components/CircularProgressIndicator';
import type { IVisualState } from '~/components/VisualState';
import type { IRadioStylesKey } from './Radio.styles';

export const RADIO_DEFAULT_TAG = 'input';

export type IRadioOwnProps = IContainerProps<IRadioStylesKey> &
  Pick<React.AriaAttributes, 'aria-label'> & {
    innerStyles?: {
      stateLayer?: IZeroOrMore<ICompiledStyles<IStateLayerStylesKey>>;
      focusRing?: IZeroOrMore<ICompiledStyles<IFocusRingStylesKey>>;
      circularProgressIndicator?: IZeroOrMore<
        ICompiledStyles<ICircularProgressIndicatorStylesKey>
      >;
    };
    visualState?: IVisualState;
    id?: string;
    name?: string;
    required?: boolean;
    disabled?: boolean;
    readOnly?: boolean;
    checked?: boolean;
    value?: string;
    onChange?: (
      event: React.ChangeEvent<HTMLInputElement>,
      value: string | undefined,
    ) => IMaybeAsync<IAny>;
    loading?: boolean;
  };

export type IRadioProps<
  TRoot extends React.ElementType = typeof RADIO_DEFAULT_TAG,
> = IPolymorphicComponentPropsWithRef<TRoot, IRadioOwnProps>;
