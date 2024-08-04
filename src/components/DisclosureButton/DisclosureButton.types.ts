import type {
  IAny,
  ICompiledStyles,
  IContainerProps,
  IMaybeAsync,
  IOmit,
  IZeroOrMore,
} from '~/helpers/types';
import type { IDisclosureButtonStylesKey } from './DisclosureButton.styles';
import type { IListItemOwnProps, IListItemStylesKey } from '../ListItem';
import type { ICheckboxStylesKey } from '../Checkbox';
import type { ISwitchStylesKey } from '../Switch';
import type { ICircularProgressIndicatorStylesKey } from '../CircularProgressIndicator';

export type IDisclosureButtonProps =
  IContainerProps<IDisclosureButtonStylesKey> &
    IOmit<IListItemOwnProps, 'styles' | 'innerStyles'> & {
      innerStyles?: IListItemOwnProps['innerStyles'] & {
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
