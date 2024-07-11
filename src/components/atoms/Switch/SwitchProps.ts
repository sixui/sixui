import type {
  IContainerProps,
  IZeroOrMore,
  ICompiledStyles,
  IAny,
  IMaybeAsync,
} from '@/helpers/types';
import type { ISwitchStyleKey } from './Switch.styledefs';
import type { IStateLayerStyleKey } from '@/components/utils/StateLayer';
import type { IFocusRingStyleKey } from '@/components/utils/FocusRing';
import type { ICircularProgressIndicatorStyleKey } from '@/components/atoms/CircularProgressIndicator';
import type { IVisualState } from '@/components/utils/VisualState';
import type { IPolymorphicComponentPropsWithRef } from '@/helpers/react/polymorphicComponentTypes';

export const SWITCH_DEFAULT_TAG = 'input';

export type ISwitchOwnProps = IContainerProps<ISwitchStyleKey> &
  Pick<React.AriaAttributes, 'aria-label'> & {
    innerStyles?: {
      stateLayer?: IZeroOrMore<ICompiledStyles<IStateLayerStyleKey>>;
      focusRing?: IZeroOrMore<ICompiledStyles<IFocusRingStyleKey>>;
      circularProgressIndicator?: IZeroOrMore<
        ICompiledStyles<ICircularProgressIndicatorStyleKey>
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
      enabled: boolean,
    ) => IMaybeAsync<IAny>;
    icon?: React.ReactNode;
    selectedIcon?: React.ReactNode;
    onClick?: React.MouseEventHandler<HTMLInputElement>;
  };

export type ISwitchProps<
  TRoot extends React.ElementType = typeof SWITCH_DEFAULT_TAG,
> = IPolymorphicComponentPropsWithRef<TRoot, ISwitchOwnProps>;
