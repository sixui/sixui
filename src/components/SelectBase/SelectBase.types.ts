import type { IContainerProps, IOmit } from '~/helpers/types';
import type { IFieldBaseVariant } from '~/components/FieldBase';
import type { IFieldStylesKey, IFieldOwnProps } from '~/components/Field';
import type { IUseSingleFilterableListBaseProps } from '~/components/FilterableListBase';
import type {
  IFloatingFilterableListBaseProps,
  IFloatingFilterableListBaseTriggerRenderProps,
} from '~/components/FloatingFilterableListBase';

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
  IFieldOwnProps &
  IUseSingleFilterableListBaseProps<TItem, HTMLElement> & {
    itemLabel: (item: TItem) => React.ReactNode | undefined;
    canFilter?: boolean;
    getValueFieldProps?: (
      renderProps: IFloatingFilterableListBaseTriggerRenderProps<TItem>,
      selectedItem?: TItem,
    ) => IFieldOwnProps;
    clearable?: boolean;
    variant?: IFieldBaseVariant | false;
  };
