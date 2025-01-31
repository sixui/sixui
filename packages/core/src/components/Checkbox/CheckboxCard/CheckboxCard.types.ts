import type { IBoxProps } from '~/components/Box';
import type { ICardOwnProps } from '~/components/Card';
import type { IComponentThemeProps } from '~/components/ThemeProvider';
import type { IUseCheckboxProps } from '~/hooks/useCheckbox';
import type { IComponentFactory } from '~/utils/component/componentFactory';
import type { IOmit } from '~/utils/types';
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
