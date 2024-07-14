import type {
  IAny,
  ICompiledStyles,
  IContainerProps,
  IMaybeAsync,
  IOmit,
  IZeroOrMore,
} from '@/helpers/types';
import type { IDisclosureButtonStylesKey } from './DisclosureButton.styles';
import type { IListItemOwnProps } from '../ListItem';
import type { ICheckboxStylesKey } from '../Checkbox';
import type { ISwitchStyleKey } from '../Switch';
import type { ICircularProgressIndicatorStylesKey } from '../CircularProgressIndicator';

export type IDisclosureButtonProps =
  IContainerProps<IDisclosureButtonStylesKey> &
    IOmit<IListItemOwnProps, 'innerStyles'> & {
      innerStyles?: {
        listItem?: IListItemOwnProps['innerStyles'];
        checkbox?: IZeroOrMore<ICompiledStyles<ICheckboxStylesKey>>;
        switch?: IZeroOrMore<ICompiledStyles<ISwitchStyleKey>>;
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
