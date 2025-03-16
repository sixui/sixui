import type { IBoxProps } from '~/components/Box';
import type { ICardOwnProps } from '~/components/Card';
import type { RadioIndicator } from '~/components/Radio/RadioIndicator';
import type { IComponentThemeProps } from '~/components/Theme';
import type { IUseRadioProps } from '~/hooks/useRadio';
import type { IComponentFactory } from '~/utils/component/componentFactory';
import type { IOmit } from '~/utils/types';
import type { IRadioCardThemeFactory, RadioCardTheme } from './RadioCard.css';

export interface IRadioCardOwnProps
  extends IUseRadioProps,
    IOmit<ICardOwnProps, 'children'> {
  rootRef?: React.Ref<HTMLButtonElement>;
  label?: React.ReactNode;
  supportingText?: React.ReactNode;
  children?: React.ReactNode;
  hasError?: boolean;
  errorText?: React.ReactNode;
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
