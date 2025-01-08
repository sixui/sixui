import type { IAny, IMaybeAsync, IOmit } from '~/helpers/types';
import type { IPolymorphicComponentFactory } from '~/utils/component/polymorphicComponentFactory';
import type { IComponentThemeProps } from '~/utils/styles/useComponentTheme';
import type { IBoxProps } from '../Box';
import type { IButtonOwnProps } from '../Button';
import type { IPaperOwnProps } from '../Paper';
import type { chipTheme, IChipThemeFactory } from './Chip.css';

export type IChipVariant = 'assist' | 'filter' | 'input' | 'suggestion';

export interface IChipOwnProps
  extends IOmit<
    IButtonOwnProps,
    'leadingIcon' | 'trailingIcon' | 'start' | 'end'
  > {
  onTrailingClick?: (event: React.MouseEvent<Element>) => IMaybeAsync<IAny>;
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
