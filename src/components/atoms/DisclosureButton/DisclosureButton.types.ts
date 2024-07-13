import type {
  IAny,
  ICompiledStyles,
  IContainerProps,
  IMaybeAsync,
  IOmit,
  IZeroOrMore,
} from '@/helpers/types';
import type { IDisclosureButtonStyleKey } from './DisclosureButton.styles';
import type { IListItemOwnProps } from '../ListItem';
import type { ICheckboxStyleKey } from '../Checkbox';
import type { ISwitchStyleKey } from '../Switch';
import type { ICircularProgressIndicatorStyleKey } from '../CircularProgressIndicator';

export type IDisclosureButtonProps =
  IContainerProps<IDisclosureButtonStyleKey> &
    IOmit<IListItemOwnProps, 'innerStyles'> & {
      innerStyles?: {
        listItem?: IListItemOwnProps['innerStyles'];
        checkbox?: IZeroOrMore<ICompiledStyles<ICheckboxStyleKey>>;
        switch?: IZeroOrMore<ICompiledStyles<ISwitchStyleKey>>;
        circularProgressIndicator?: IZeroOrMore<
          ICompiledStyles<ICircularProgressIndicatorStyleKey>
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
