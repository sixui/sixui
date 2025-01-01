import type {
  IAny,
  ICompiledStyles,
  IMaybeAsync,
  IOmit,
  IZeroOrMore,
} from '~/helpers/types';
import type { IBaseProps } from '../Base';
import type { ICheckboxStylesKey } from '../Checkbox';
import type { ICircularProgressIndicatorStylesKey } from '../CircularProgressIndicator';
import type { IListItemProps, IListItemStylesKey } from '../ListItem';
import type { ISwitchStylesKey } from '../Switch';
import type { IDisclosureButtonStylesKey } from './DisclosureButton.styles';

export type IDisclosureButtonProps = IBaseProps<IDisclosureButtonStylesKey> &
  IOmit<IListItemProps, 'styles' | 'innerStyles'> & {
    innerStyles?: IListItemProps['innerStyles'] & {
      listItem?: IZeroOrMore<ICompiledStyles<IListItemStylesKey>>;
      checkbox?: IZeroOrMore<ICompiledStyles<ICheckboxStylesKey>>;
      switch?: IZeroOrMore<ICompiledStyles<ISwitchStylesKey>>;
      circularProgressIndicator?: IZeroOrMore<
        ICompiledStyles<ICircularProgressIndicatorStylesKey>
      >;
    };
    collapseIcon?: React.ReactNode;
    expandIcon?: React.ReactNode;
    expanded?: boolean;
    checkable?: boolean;
    onChange?: (
      event: React.ChangeEvent<HTMLInputElement>,
      value: React.InputHTMLAttributes<HTMLInputElement>['value'],
    ) => IMaybeAsync<IAny>;
    checked?: boolean;
    defaultChecked?: boolean;
    loading?: boolean;
    switchable?: boolean;
  };
