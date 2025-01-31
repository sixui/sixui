import type { IBoxProps } from '~/components/Box';
import type { IComponentThemeProps } from '~/components/ThemeProvider';
import type { IUseRadioProps } from '~/hooks/useRadio';
import type { IComponentFactory } from '~/utils/component/componentFactory';
import type { IRadioThemeFactory, RadioTheme } from './Radio.css';
import type { RadioCard } from './RadioCard';
import type { RadioGroup } from './RadioGroup';
import type { RadioIndicator } from './RadioIndicator';

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
