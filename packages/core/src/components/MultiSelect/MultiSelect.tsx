import type { IFilterableListItem } from '~/components/FilterableList';
import type { IMultiSelectFactory } from './MultiSelect.types';
import { areFilterableListItemsEqual } from '~/components/FilterableList/utils/areFilterableListItemsEqual';
import { filterFilterableList } from '~/components/FilterableList/utils/filterFilterableList';
import { getFilterableListItemLabel } from '~/components/FilterableList/utils/getFilterableListItemLabel';
import { isFilterableListItemDisabled } from '~/components/FilterableList/utils/isFilterableListItemDisabled';
import { renderFilterableListItem } from '~/components/FilterableList/utils/renderFilterableListItem';
import { ListItem } from '~/components/List/ListItem';
import { multiSelectBaseFactory } from '~/components/MultiSelectBase';
import { componentFactory } from '~/utils/component/componentFactory';
import { useProps } from '~/utils/component/useProps';
import { COMPONENT_NAME } from './MultiSelect.constants';
import { useMultiSelect } from './useMultiSelect';

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
