import type { IBoxProps } from '~/components/Box';
import type { ICardOwnProps } from '~/components/Card';
import type { IOmit } from '~/helpers/types';
import type { IUseCheckboxProps } from '~/hooks/useCheckbox';
import type { IComponentFactory } from '~/utils/component/componentFactory';
import type { IComponentThemeProps } from '~/utils/styles/useComponentTheme';
import type {
  checkboxCardTheme,
  ICheckboxCardThemeFactory,
} from './CheckboxCard.css';

export interface ICheckboxCardOwnProps
  extends IUseCheckboxProps,
    IOmit<ICardOwnProps, 'children'> {
  rootRef?: React.Ref<HTMLButtonElement>;
  label?: React.ReactNode;
  supportingText?: React.ReactNode;
  children?: React.ReactNode;
}

export interface ICheckboxCardProps
  extends IBoxProps,
    IComponentThemeProps<ICheckboxCardThemeFactory>,
    ICheckboxCardOwnProps {}

export type ICheckboxCardFactory = IComponentFactory<{
  props: ICheckboxCardProps;
  ref: HTMLInputElement;
  theme: typeof checkboxCardTheme;
}>;
