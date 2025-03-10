import type { IFilterableListItem } from '~/components/FilterableList';
import type { IMultiSelectControlFactory } from './MultiSelectControl.types';
import { areFilterableListItemsEqual } from '~/components/FilterableList/utils/areFilterableListItemsEqual';
import { filterFilterableList } from '~/components/FilterableList/utils/filterFilterableList';
import { getFilterableListItemLabel } from '~/components/FilterableList/utils/getFilterableListItemLabel';
import { isFilterableListItemDisabled } from '~/components/FilterableList/utils/isFilterableListItemDisabled';
import { renderFilterableListItem } from '~/components/FilterableList/utils/renderFilterableListItem';
import { ListItem } from '~/components/List/ListItem';
import { multiSelectBaseFactory } from '~/components/MultiSelectBase';
import { useProps } from '~/components/Theme';
import { useMultiSelect } from '~/hooks/useMultiSelect';
import { componentFactory } from '~/utils/component/componentFactory';
import { COMPONENT_NAME } from './MultiSelectControl.constants';

const MultiSelectBase = multiSelectBaseFactory<IFilterableListItem>();

export const MultiSelectControl = componentFactory<IMultiSelectControlFactory>(
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

MultiSelectControl.displayName = `@sixui/core/${COMPONENT_NAME}`;
