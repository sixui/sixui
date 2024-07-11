import type { IContainerProps, IOmit } from '@/helpers/types';
import type { IFieldBaseVariant } from '@/components/atoms/FieldBase';
import type { IFilterableListItemRenderer } from '@/components/atoms/FilterableListBase';
import type { ITextFieldBaseStyleKey } from '@/components/atoms/TextFieldBase';
import type {
  IFloatingFilterableListBaseProps,
  IFloatingFilterableListBaseTriggerRenderProps,
} from '@/components/atoms/FloatingFilterableListBase';
import type { ITextInputFieldOwnProps } from '@/components/atoms/TextInputField';
import type { IInputChipProps } from '@/components/atoms/Chip';

export type IMultiSelectBaseProps<TItem> =
  IContainerProps<ITextFieldBaseStyleKey> &
    IOmit<
      IFloatingFilterableListBaseProps<TItem, HTMLElement>,
      'onItemSelect' | 'renderer' | 'listRenderer' | 'itemRenderer' | 'children'
    > &
    ITextInputFieldOwnProps & {
      selectedItems?: Array<TItem>;
      defaultItems?: Array<TItem>;
      onItemsChange?: (value: Array<TItem>) => void;
      items: Array<TItem>;
      itemRenderer: IFilterableListItemRenderer<TItem, HTMLElement>;
      itemLabel: (item: TItem) => string | undefined;
      getValueFieldProps?: (
        renderProps: IFloatingFilterableListBaseTriggerRenderProps<TItem>,
        selectedItem: TItem,
      ) => IInputChipProps;
      clearable?: boolean;
      variant?: IFieldBaseVariant | false;
    };
