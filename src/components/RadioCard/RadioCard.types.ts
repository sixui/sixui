import type { IOmit } from '~/helpers/types';
import type { IUseRadioProps } from '~/hooks/useRadio';
import type { IComponentFactory } from '~/utils/component/componentFactory';
import type { IComponentThemeProps } from '~/utils/styles/useComponentTheme';
import type { IBoxProps } from '../Box';
import type { ICardOwnProps } from '../Card';
import type { RadioIndicator } from '../RadioIndicator';
import type { IRadioCardThemeFactory, RadioCardTheme } from './RadioCard.css';

export interface IRadioCardOwnProps
  extends IUseRadioProps,
    IOmit<ICardOwnProps, 'children'> {
  rootRef?: React.Ref<HTMLButtonElement>;
  label?: React.ReactNode;
  supportingText?: React.ReactNode;
  children?: React.ReactNode;
}

export interface IRadioCardProps
  extends IBoxProps,
    IComponentThemeProps<IRadioCardThemeFactory>,
    IRadioCardOwnProps {}

export type IRadioCardFactory = IComponentFactory<{
  props: IRadioCardProps;
  ref: HTMLInputElement;
  theme: typeof RadioCardTheme;
  staticComponents: {
    Indicator: typeof RadioIndicator;
  };
}>;
