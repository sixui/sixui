import type { IComponentFactory } from '~/utils/component/componentFactory';
import type { IComponentThemeProps } from '~/utils/styles/useComponentTheme';
import type { IBoxProps } from '../Box';
import type {
  disclosureTheme,
  IDisclosureThemeFactory,
} from './Disclosure.css';

export type IDisclosureVariant = 'primary';

export interface IDisclosureOwnProps {
  children?: React.ReactNode;
  disabled?: boolean;
}

export interface IDisclosureProps
  extends IBoxProps,
    IComponentThemeProps<IDisclosureThemeFactory>,
    IDisclosureOwnProps {}

export type IDisclosureFactory = IComponentFactory<{
  props: IDisclosureProps;
  ref: HTMLDivElement;
  theme: typeof disclosureTheme;
  variant: IDisclosureVariant | false;
}>;
