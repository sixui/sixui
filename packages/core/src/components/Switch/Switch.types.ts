import type { IBoxProps } from '~/components/Box';
import type { IComponentThemeProps } from '~/components/Theme';
import type { IComponentFactory } from '~/utils/component/componentFactory';
import type { IHorizontalSide } from '~/utils/types';
import type { ILabeledOwnProps } from '../Labeled';
import type { ISwitchThemeFactory, switchTheme } from './Switch.css';
import type { ISwitchControlOwnProps, SwitchControl } from './SwitchControl';
import type { SwitchIndicator } from './SwitchIndicator';

export interface ISwitchOwnProps
  extends ISwitchControlOwnProps,
    Pick<
      ILabeledOwnProps,
      'label' | 'supportingText' | 'hasError' | 'errorText' | 'requiredSign'
    > {
  labelPosition?: IHorizontalSide;
  labeledProps?: ILabeledOwnProps;
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
