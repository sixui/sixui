import type { IBoxProps } from '~/components/Box';
import type { IButtonOwnProps } from '~/components/Button';
import type { IComponentThemeProps } from '~/components/Theme';
import type { IPolymorphicComponentFactory } from '~/utils/component/polymorphicComponentFactory';
import type { IMaybeAsync, IOmit } from '~/utils/types';
import type { chipTheme, IChipThemeFactory } from './Chip.css';

export const chipVariants = [
  'assist',
  'filter',
  'input',
  'suggestion',
] as const;
export type IChipVariant = (typeof chipVariants)[number];

export interface IChipOwnProps
  extends IOmit<
    IButtonOwnProps,
    'leadingIcon' | 'trailingIcon' | 'startSlot' | 'endSlot'
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
  autoHeight?: boolean;
}

export interface IChipProps
  extends IBoxProps,
    IComponentThemeProps<IChipThemeFactory>,
    IChipOwnProps {}

export type IChipFactory = IPolymorphicComponentFactory<{
  props: IChipProps;
  defaultRef: HTMLButtonElement;
  defaultRoot: 'button';
  theme: typeof chipTheme;
  variant: IChipVariant | false;
}>;
