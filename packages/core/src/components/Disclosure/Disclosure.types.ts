import type { IBoxProps } from '~/components/Box';
import type { IExpandableOwnProps } from '~/components/Expandable';
import type { IComponentThemeProps } from '~/components/Theme';
import type { IComponentFactory } from '~/utils/component/componentFactory';
import type {
  disclosureTheme,
  IDisclosureThemeFactory,
} from './Disclosure.css';
import type { DisclosureTrigger } from './DisclosureTrigger';

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
    Trigger: typeof DisclosureTrigger;
  };
}>;
