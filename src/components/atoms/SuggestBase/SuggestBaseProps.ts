import type { IContainerProps, IOmit } from '@/helpers/types';
import type { IFieldBaseVariant } from '@/components/atoms/FieldBase';
import type { ITextFieldBaseStyleKey } from '@/components/atoms/TextFieldBase';
import type {
  IFloatingFilterableListBaseProps,
  IFloatingFilterableListBaseTriggerRenderProps,
} from '@/components/atoms/FloatingFilterableListBase';
import type { ITextInputFieldProps } from '@/components/atoms/TextInputField';
import type { IUseSingleFilterableListBaseProps } from '@/components/atoms/FilterableListBase';

export type ISuggestBaseProps<TItem> = IContainerProps<ITextFieldBaseStyleKey> &
  IOmit<
    IFloatingFilterableListBaseProps<TItem, HTMLElement>,
    | 'onItemSelect'
    | 'renderer'
    | 'listRenderer'
    | 'itemRenderer'
    | 'itemsEqual'
    | 'children'
    | 'defaultQuery'
  > &
  ITextInputFieldProps &
  IUseSingleFilterableListBaseProps<TItem, HTMLElement> & {
    itemLabel: (item: TItem) => string | undefined;
    getValueFieldProps?: (
      renderProps: IFloatingFilterableListBaseTriggerRenderProps<TItem>,
      selectedItem?: TItem,
    ) => ITextInputFieldProps;
    clearable?: boolean;
    variant?: IFieldBaseVariant;
  };
