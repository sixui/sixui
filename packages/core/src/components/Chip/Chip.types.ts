import type { IBoxProps } from '~/components/Box';
import type { IButtonOwnProps } from '~/components/Button';
import type { IPaperOwnProps } from '~/components/Paper';
import type { IComponentThemeProps } from '~/components/ThemeProvider';
import type { IPolymorphicComponentFactory } from '~/utils/component/polymorphicComponentFactory';
import type { IMaybeAsync, IOmit } from '~/utils/types';
import type { chipTheme, IChipThemeFactory } from './Chip.css';

export type IChipVariant = 'assist' | 'filter' | 'input' | 'suggestion';

export interface IChipOwnProps
  extends IOmit<
    IButtonOwnProps,
    'leadingIcon' | 'trailingIcon' | 'startSlot' | 'endSlot' | 'children'
  > {
  onTrailingClick?: (event: React.MouseEvent) => IMaybeAsync<unknown>;
  trailingLoading?: boolean;
  trailingIcon?: React.ReactNode;
  elevated?: boolean;
  selected?: boolean;
  imageUrl?: string;
  loadingText?: string;
  avatar?: boolean;
  icon?: React.ReactNode;
  selectedIcon?: React.ReactNode;
}

export interface IChipProps
  extends IBoxProps,
    IComponentThemeProps<IChipThemeFactory>,
    IPaperOwnProps,
    IChipOwnProps {}

export type IChipFactory = IPolymorphicComponentFactory<{
  props: IChipProps;
  defaultRef: HTMLButtonElement;
  defaultRoot: 'button';
  theme: typeof chipTheme;
  variant: IChipVariant | false;
}>;
