import type { IBoxProps } from '~/components/Box';
import type { IComponentThemeProps } from '~/components/Theme';
import type { IUseRadioProps } from '~/hooks/useRadio';
import type { IComponentFactory } from '~/utils/component/componentFactory';
import type {
  IRadioControlThemeFactory,
  RadioControlTheme,
} from './RadioControl.css';

export interface IRadioControlOwnProps extends IUseRadioProps {
  rootRef?: React.Ref<HTMLDivElement>;
}

export interface IRadioControlProps
  extends IBoxProps,
    IComponentThemeProps<IRadioControlThemeFactory>,
    IRadioControlOwnProps {}

export type IRadioControlFactory = IComponentFactory<{
  props: IRadioControlProps;
  ref: HTMLInputElement;
  theme: typeof RadioControlTheme;
}>;
