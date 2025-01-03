import type { IUseRadioProps } from '~/hooks/useRadio';
import type { IComponentFactory } from '~/utils/component/componentFactory';
import type { IComponentThemeProps } from '~/utils/styles/useComponentTheme';
import type { IBoxProps } from '../Box';
import type { RadioCard } from '../RadioCard';
import type { RadioGroup } from '../RadioGroup';
import type { RadioIndicator } from '../RadioIndicator';
import type { IRadioThemeFactory, RadioTheme } from './Radio.css';

export interface IRadioOwnProps extends IUseRadioProps {
  rootRef?: React.Ref<HTMLDivElement>;
}

export interface IRadioProps
  extends IBoxProps,
    IComponentThemeProps<IRadioThemeFactory>,
    IRadioOwnProps {}

export type IRadioFactory = IComponentFactory<{
  props: IRadioProps;
  ref: HTMLInputElement;
  theme: typeof RadioTheme;
  staticComponents: {
    Group: typeof RadioGroup;
    Indicator: typeof RadioIndicator;
    Card: typeof RadioCard;
  };
}>;
