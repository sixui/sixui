import type { IFilterableListItem } from '../FilterableList';
import type { IMultiSelectFactory } from './MultiSelect.types';
import { componentFactory } from '~/utils/component/componentFactory';
import { useProps } from '~/utils/component/useProps';
import { areFilterableListItemsEqual } from '../FilterableList/utils/areFilterableListItemsEqual';
import { filterFilterableList } from '../FilterableList/utils/filterFilterableList';
import { getFilterableListItemLabel } from '../FilterableList/utils/getFilterableListItemLabel';
import { isFilterableListItemDisabled } from '../FilterableList/utils/isFilterableListItemDisabled';
import { renderFilterableListItem } from '../FilterableList/utils/renderFilterableListItem';
import { ListItem } from '../ListItem';
import { multiSelectBaseFactory } from '../MultiSelectBase';
import { useMultiSelect } from './useMultiSelect';

const COMPONENT_NAME = 'MultiSelect';

const MultiSelectBase = multiSelectBaseFactory<IFilterableListItem>();

export const MultiSelect = componentFactory<IMultiSelectFactory>(
  (props, forwardedRef) => {
    const {
      getValueFieldProps,
      value,
      defaultValue,
      onChange,
      noResultsLabel,
      ...other
    } = useProps({ componentName: COMPONENT_NAME, props });

    const { defaultItems, selectedItems } = useMultiSelect({
      items: other.items,
      defaultValue,
      value,
    });

    return (
      <MultiSelectBase
        itemsEqual={areFilterableListItemsEqual}
        listPredicate={filterFilterableList}
        itemDisabled={isFilterableListItemDisabled}
        noResults={
          noResultsLabel ? (
            <ListItem disabled>{noResultsLabel}</ListItem>
          ) : undefined
        }
        {...other}
        itemRenderer={renderFilterableListItem}
        itemLabel={getFilterableListItemLabel}
        getValueFieldProps={(renderProps, item) => ({
          icon: item.icon,
          imageUrl: item.imageUrl,
          ...getValueFieldProps?.(renderProps, item),
        })}
        defaultItems={defaultItems}
        selectedItems={selectedItems}
        onItemsChange={(items) => onChange?.(items.map((item) => item.value))}
        ref={forwardedRef}
      />
    );
  },
);

MultiSelect.displayName = `@sixui/${COMPONENT_NAME}`;
