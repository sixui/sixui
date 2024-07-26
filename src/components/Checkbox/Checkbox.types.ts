import type {
  IContainerProps,
  IZeroOrMore,
  ICompiledStyles,
  IMaybeAsync,
  IAny,
} from '~/helpers/types';
import type { IPolymorphicComponentPropsWithRef } from '~/helpers/react/polymorphicComponentTypes';
import type { ICheckboxStylesKey } from './Checkbox.styles';
import type { IStateLayerStylesKey } from '~/components/StateLayer';
import type { IFocusRingStylesKey } from '~/components/FocusRing';
import type { ICircularProgressIndicatorStylesKey } from '~/components/CircularProgressIndicator';
import type { IVisualState } from '~/components/VisualState';

export const CHECKBOX_DEFAULT_TAG = 'input';

export type ICheckboxOwnProps = IContainerProps<ICheckboxStylesKey> & {
  innerStyles?: {
    stateLayer?: IZeroOrMore<ICompiledStyles<IStateLayerStylesKey>>;
    focusRing?: IZeroOrMore<ICompiledStyles<IFocusRingStylesKey>>;
    circularProgressIndicator?: IZeroOrMore<
      ICompiledStyles<ICircularProgressIndicatorStylesKey>
    >;
  };
  visualState?: IVisualState;
  required?: boolean;
  disabled?: boolean;
  readOnly?: boolean;
  id?: string;
  name?: string;
  checked?: boolean;
  defaultChecked?: boolean;
  indeterminate?: boolean;
  onChange?: (
    event: React.ChangeEvent<HTMLInputElement>,
    value: React.InputHTMLAttributes<HTMLInputElement>['value'],
  ) => IMaybeAsync<IAny>;
  loading?: boolean;
};

export type ICheckboxProps<
  TRoot extends React.ElementType = typeof CHECKBOX_DEFAULT_TAG,
> = IPolymorphicComponentPropsWithRef<TRoot, ICheckboxOwnProps>;
