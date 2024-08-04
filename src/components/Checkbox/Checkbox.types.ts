import type {
  IContainerProps,
  IZeroOrMore,
  ICompiledStyles,
  IMaybeAsync,
  IAny,
  IOmit,
} from '~/helpers/types';
import type { IPolymorphicComponentPropsWithRef } from '~/helpers/react/polymorphicComponentTypes';
import type { ICheckboxStylesKey } from './Checkbox.styles';
import type { IStateLayerStylesKey } from '../StateLayer';
import type { IFocusRingStylesKey } from '../FocusRing';
import type { ICircularProgressIndicatorStylesKey } from '../CircularProgressIndicator';
import type { IVisualState } from '../VisualState';

export const CHECKBOX_DEFAULT_TAG = 'input';

export type ICheckboxOwnProps = IContainerProps<ICheckboxStylesKey> &
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
    defaultValue?: boolean;

    /**
     * If `true`, the component will be rendered in a disabled state, but will
     * still be focusable.
     */
    softDisabled?: boolean;
  };

export type ICheckboxProps<
  TRoot extends React.ElementType = typeof CHECKBOX_DEFAULT_TAG,
> = IPolymorphicComponentPropsWithRef<TRoot, ICheckboxOwnProps>;
