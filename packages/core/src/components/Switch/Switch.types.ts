import type { IBoxProps } from '~/components/Box';
import type { ILabeledOwnProps, ILabeledProps } from '~/components/Labeled';
import type { IComponentThemeProps } from '~/components/Theme';
import type { IComponentFactory } from '~/utils/component/componentFactory';
import type { IHorizontalSide } from '~/utils/types';
import type { ISwitchThemeFactory, switchTheme } from './Switch.css';
import type {
  ISwitchControlOwnProps,
  ISwitchControlProps,
  SwitchControl,
} from './SwitchControl';
import type { SwitchIndicator } from './SwitchIndicator';

export interface ISwitchOwnProps
  extends ISwitchControlOwnProps,
    Pick<
      ILabeledOwnProps,
      | 'label'
      | 'supportingText'
      | 'withRequiredSign'
      | 'requiredSign'
      | 'hasError'
      | 'errorText'
    > {
  labelPosition?: IHorizontalSide;
  labeledProps?: ILabeledProps;
  controlProps?: ISwitchControlProps;
}

export interface ISwitchProps
  extends IBoxProps,
    IComponentThemeProps<ISwitchThemeFactory>,
    ISwitchOwnProps {}

export type ISwitchFactory = IComponentFactory<{
  props: ISwitchProps;
  ref: HTMLInputElement;
  theme: typeof switchTheme;
  staticComponents: {
    Control: typeof SwitchControl;
    Indicator: typeof SwitchIndicator;
  };
}>;
