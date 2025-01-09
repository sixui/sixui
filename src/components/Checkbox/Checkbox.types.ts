import type { CheckboxGroup } from 'react-aria-components';

import type { IUseCheckboxProps } from '~/hooks/useCheckbox';
import type { IComponentFactory } from '~/utils/component/componentFactory';
import type { IComponentThemeProps } from '~/utils/styles/useComponentTheme';
import type { IBoxProps } from '../Box';
import type { CheckboxCard } from '../CheckboxCard';
import type { CheckboxIndicator } from '../CheckboxIndicator';
import type { checkboxTheme, ICheckboxThemeFactory } from './Checkbox.css';

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
