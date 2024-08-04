import type {
  ICompiledStyles,
  IContainerProps,
  IOmit,
  IZeroOrMore,
} from '~/helpers/types';
import type { IFieldBaseVariant } from '~/components/FieldBase';
import type { IFilterableListItemRenderer } from '~/components/FilterableListBase';
import type {
  IFloatingFilterableListBaseProps,
  IFloatingFilterableListBaseTriggerRenderProps,
} from '~/components/FloatingFilterableListBase';
import type { ITextInputFieldProps } from '~/components/TextInputField';
import type { IInputChipProps } from '~/components/Chip';
import type { ITextFieldBaseStylesKey } from '~/components/TextFieldBase';
import type { IMultiSelectBaseStylesKey } from './MultiSelectBase.styles';

export type IMultiSelectBaseProps<TItem> =
  IContainerProps<IMultiSelectBaseStylesKey> &
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
