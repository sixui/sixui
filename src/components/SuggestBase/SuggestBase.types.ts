import type { IOmit } from '~/helpers/types';
import type { IBaseProps } from '../Base';
import type { IFieldBaseVariant } from '../FieldBase';
import type { ITextFieldBaseStylesKey } from '../TextFieldBase';
import type {
  IFloatingFilterableListBaseProps,
  IFloatingFilterableListBaseTriggerRenderProps,
} from '../FloatingFilterableListBase';
import type { ITextInputFieldProps } from '../TextInputField';
import type { IUseSingleFilterableListBaseProps } from '../FilterableListBase';

export type ISuggestBaseProps<TItem> = IBaseProps<ITextFieldBaseStylesKey> &
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
    itemLabel: (item: TItem) => React.ReactNode | undefined;
    getValueFieldProps?: (
      renderProps: IFloatingFilterableListBaseTriggerRenderProps<TItem>,
      selectedItem?: TItem,
    ) => ITextInputFieldProps;
    clearable?: boolean;
    variant?: IFieldBaseVariant;
  };
