import type { IBoxProps } from '~/components/Box';
import type { IComponentThemeProps } from '~/components/ThemeProvider';
import type { IUseCheckboxProps } from '~/hooks/useCheckbox';
import type { IComponentFactory } from '~/utils/component/componentFactory';
import type { checkboxTheme, ICheckboxThemeFactory } from './Checkbox.css';
import type { CheckboxCard } from './CheckboxCard';
import type { CheckboxGroup } from './CheckboxGroup';
import type { CheckboxIndicator } from './CheckboxIndicator';

export interface ICheckboxOwnProps extends IUseCheckboxProps {
  rootRef?: React.Ref<HTMLDivElement>;
}

export interface ICheckboxProps
  extends IBoxProps,
    IComponentThemeProps<ICheckboxThemeFactory>,
    ICheckboxOwnProps {}

export type ICheckboxFactory = IComponentFactory<{
  props: ICheckboxProps;
  ref: HTMLInputElement;
  theme: typeof checkboxTheme;
  staticComponents: {
    Group: typeof CheckboxGroup;
    Indicator: typeof CheckboxIndicator;
    Card: typeof CheckboxCard;
  };
}>;
