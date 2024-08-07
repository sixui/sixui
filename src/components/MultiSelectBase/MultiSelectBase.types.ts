import type { ICompiledStyles, IOmit, IZeroOrMore } from '~/helpers/types';
import type { IBaseProps } from '../Base';
import type { IFieldBaseVariant } from '../FieldBase';
import type { IFilterableListItemRenderer } from '../FilterableListBase';
import type {
  IFloatingFilterableListBaseProps,
  IFloatingFilterableListBaseTriggerRenderProps,
} from '../FloatingFilterableListBase';
import type { ITextInputFieldProps } from '../TextInputField';
import type { IInputChipProps } from '../Chip';
import type { ITextFieldBaseStylesKey } from '../TextFieldBase';
import type { IMultiSelectBaseStylesKey } from './MultiSelectBase.styles';

export type IMultiSelectBaseProps<TItem> =
  IBaseProps<IMultiSelectBaseStylesKey> &
    IOmit<
      IFloatingFilterableListBaseProps<TItem, HTMLElement>,
      | 'styles'
      | 'onItemSelect'
      | 'renderer'
      | 'listRenderer'
      | 'itemRenderer'
      | 'children'
    > &
    IOmit<ITextInputFieldProps, 'styles'> & {
      innerStyles?: {
        textInputField?: IZeroOrMore<ICompiledStyles<ITextFieldBaseStylesKey>>;
      };
      selectedItems?: Array<TItem>;
      defaultItems?: Array<TItem>;
      onItemsChange?: (value: Array<TItem>) => void;
      items: Array<TItem>;
      itemRenderer: IFilterableListItemRenderer<TItem, HTMLElement>;
      itemLabel: (item: TItem) => React.ReactNode | undefined;
      getValueFieldProps?: (
        renderProps: IFloatingFilterableListBaseTriggerRenderProps<TItem>,
        selectedItem: TItem,
      ) => IInputChipProps;
      clearable?: boolean;
      variant?: IFieldBaseVariant | false;
    };
