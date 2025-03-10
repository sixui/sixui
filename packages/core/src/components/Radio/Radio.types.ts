import type { IBoxProps } from '~/components/Box';
import type { ILabeledOwnProps, ILabeledProps } from '~/components/Labeled';
import type { IComponentThemeProps } from '~/components/Theme';
import type { IComponentFactory } from '~/utils/component/componentFactory';
import type { IHorizontalSide } from '~/utils/types';
import type { IRadioThemeFactory, radioTheme } from './Radio.css';
import type { RadioCard } from './RadioCard';
import type {
  IRadioControlOwnProps,
  IRadioControlProps,
  RadioControl,
} from './RadioControl';
import type { RadioGroup } from './RadioGroup';
import type { RadioIndicator } from './RadioIndicator';

export interface IRadioOwnProps
  extends IRadioControlOwnProps,
    Pick<
      ILabeledOwnProps,
      'label' | 'supportingText' | 'requiredSign' | 'hasError' | 'errorText'
    > {
  labelPosition?: IHorizontalSide;
  labeledProps?: ILabeledProps;
  controlProps?: IRadioControlProps;
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
