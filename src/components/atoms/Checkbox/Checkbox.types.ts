import type {
  IContainerProps,
  IZeroOrMore,
  ICompiledStyles,
  IMaybeAsync,
  IAny,
} from '@/helpers/types';
import type { IPolymorphicComponentPropsWithRef } from '@/helpers/react/polymorphicComponentTypes';
import type { ICheckboxStylesKey } from './Checkbox.styles';
import type { IStateLayerStyleKey } from '@/components/utils/StateLayer';
import type { IFocusRingStyleKey } from '@/components/utils/FocusRing';
import type { ICircularProgressIndicatorStylesKey } from '@/components/atoms/CircularProgressIndicator';
import type { IVisualState } from '@/components/utils/VisualState';

export const CHECKBOX_DEFAULT_TAG = 'input';

export type ICheckboxOwnProps = IContainerProps<ICheckboxStylesKey> & {
  innerStyles?: {
    stateLayer?: IZeroOrMore<ICompiledStyles<IStateLayerStyleKey>>;
    focusRing?: IZeroOrMore<ICompiledStyles<IFocusRingStyleKey>>;
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
