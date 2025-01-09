import type { IComponentFactory } from '~/utils/component/componentFactory';
import type { IComponentThemeProps } from '~/utils/styles/useComponentTheme';
import type { IBoxProps } from '../Box';
import type { DisclosureListItem } from '../DisclosureListItem';
import type { IExpandableOwnProps } from '../Expandable';
import type {
  disclosureTheme,
  IDisclosureThemeFactory,
} from './Disclosure.css';

export type IDisclosureOwnProps = IExpandableOwnProps;

export interface IDisclosureProps
  extends IBoxProps,
    IComponentThemeProps<IDisclosureThemeFactory>,
    IDisclosureOwnProps {}

export type IDisclosureFactory = IComponentFactory<{
  props: IDisclosureProps;
  ref: HTMLDivElement;
  theme: typeof disclosureTheme;
  staticComponents: {
    ListItem: typeof DisclosureListItem;
  };
}>;
