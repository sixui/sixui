import type { IContainerProps, IOmit } from '~/helpers/types';
import type { IFieldBaseVariant } from '../FieldBase';
import type { IFieldStylesKey, IFieldProps } from '../Field';
import type { IUseSingleFilterableListBaseProps } from '../FilterableListBase';
import type {
  IFloatingFilterableListBaseProps,
  IFloatingFilterableListBaseTriggerRenderProps,
} from '../FloatingFilterableListBase';

export type ISelectBaseProps<TItem> = IContainerProps<IFieldStylesKey> &
  IOmit<
    IFloatingFilterableListBaseProps<TItem, HTMLElement>,
    'onItemSelect' | 'renderer' | 'itemRenderer' | 'itemsEqual' | 'children'
  > &
  Partial<
    Pick<
      IFloatingFilterableListBaseProps<TItem, HTMLElement>,
      'onItemSelect' | 'renderer' | 'itemRenderer'
    >
  > &
  IFieldProps &
  IUseSingleFilterableListBaseProps<TItem, HTMLElement> & {
    itemLabel: (item: TItem) => React.ReactNode | undefined;
    canFilter?: boolean;
    getValueFieldProps?: (
      renderProps: IFloatingFilterableListBaseTriggerRenderProps<TItem>,
      selectedItem?: TItem,
    ) => IFieldProps;
    clearable?: boolean;
    variant?: IFieldBaseVariant | false;
  };
