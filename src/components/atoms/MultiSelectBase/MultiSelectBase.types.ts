import type {
  ICompiledStyles,
  IContainerProps,
  IOmit,
  IZeroOrMore,
} from '@/helpers/types';
import type { IFieldBaseVariant } from '@/components/atoms/FieldBase';
import type { IFilterableListItemRenderer } from '@/components/atoms/FilterableListBase';
import type {
  IFloatingFilterableListBaseProps,
  IFloatingFilterableListBaseTriggerRenderProps,
} from '@/components/atoms/FloatingFilterableListBase';
import type {
  ITextInputFieldOwnProps,
  ITextInputStylesKey,
} from '@/components/atoms/TextInputField';
import type { IInputChipProps } from '@/components/atoms/Chip';
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
    IOmit<ITextInputFieldOwnProps, 'styles'> & {
      innerStyles?: {
        textInputField?: IZeroOrMore<ICompiledStyles<ITextInputStylesKey>>;
      };
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
