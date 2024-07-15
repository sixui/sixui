import type {
  IContainerProps,
  IZeroOrMore,
  ICompiledStyles,
  IAny,
  IMaybeAsync,
} from '@/helpers/types';
import type { IStateLayerStylesKey } from '@/components/StateLayer';
import type { IFocusRingStylesKey } from '@/components/FocusRing';
import type { ICircularProgressIndicatorStylesKey } from '@/components/CircularProgressIndicator';
import type { IVisualState } from '@/components/VisualState';
import type { IPolymorphicComponentPropsWithRef } from '@/helpers/react/polymorphicComponentTypes';
import type { ISwitchStylesKey } from './Switch.styles';

export const SWITCH_DEFAULT_TAG = 'input';

export type ISwitchOwnProps = IContainerProps<ISwitchStylesKey> &
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
    disabled?: boolean;
    readOnly?: boolean;
    required?: boolean;

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

export type ISwitchProps<
  TRoot extends React.ElementType = typeof SWITCH_DEFAULT_TAG,
> = IPolymorphicComponentPropsWithRef<TRoot, ISwitchOwnProps>;
