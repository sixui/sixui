import type { IBoxProps } from '~/components/Box';
import type { ILabeledOwnProps } from '~/components/Labeled';
import type { IComponentThemeProps } from '~/components/Theme';
import type { IComponentFactory } from '~/utils/component/componentFactory';
import type { IHorizontalSide } from '~/utils/types';
import type { IRadioThemeFactory, radioTheme } from './Radio.css';
import type { RadioCard } from './RadioCard';
import type { IRadioControlOwnProps, RadioControl } from './RadioControl';
import type { RadioGroup } from './RadioGroup';
import type { RadioIndicator } from './RadioIndicator';

export interface IRadioOwnProps
  extends IRadioControlOwnProps,
    Pick<
      ILabeledOwnProps,
      'label' | 'supportingText' | 'hasError' | 'errorText' | 'requiredSign'
    > {
  labelPosition?: IHorizontalSide;
  labeledProps?: ILabeledOwnProps;
}

export interface IRadioProps
  extends IBoxProps,
    IComponentThemeProps<IRadioThemeFactory>,
    IRadioOwnProps {}

export type IRadioFactory = IComponentFactory<{
  props: IRadioProps;
  ref: HTMLInputElement;
  theme: typeof radioTheme;
  staticComponents: {
    Control: typeof RadioControl;
    Indicator: typeof RadioIndicator;
    Group: typeof RadioGroup;
    Card: typeof RadioCard;
  };
}>;
