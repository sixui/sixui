import type { IContainerProps, IOmit } from '~/helpers/types';
import type { IFieldBaseVariant } from '~/components/FieldBase';
import type { ITextFieldBaseStylesKey } from '~/components/TextFieldBase';
import type {
  IFloatingFilterableListBaseProps,
  IFloatingFilterableListBaseTriggerRenderProps,
} from '~/components/FloatingFilterableListBase';
import type { ITextInputFieldProps } from '~/components/TextInputField';
import type { IUseSingleFilterableListBaseProps } from '~/components/FilterableListBase';

export type ISuggestBaseProps<TItem> =
  IContainerProps<ITextFieldBaseStylesKey> &
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
