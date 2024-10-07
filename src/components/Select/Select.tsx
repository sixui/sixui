import type { IFilterableListItem } from '../FilterableList';
import type { ISelectFactory } from './Select.types';
import { componentFactory } from '~/utils/component/componentFactory';
import { useProps } from '~/utils/component/useProps';
import { areFilterableListItemsEqual } from '../FilterableList/utils/areFilterableListItemsEqual';
import { filterFilterableList } from '../FilterableList/utils/filterFilterableList';
import { getFilterableListItemLabel } from '../FilterableList/utils/getFilterableListItemLabel';
import { isFilterableListItemDisabled } from '../FilterableList/utils/isFilterableListItemDisabled';
import { isFilterableListItemEmpty } from '../FilterableList/utils/isFilterableListItemEmpty';
import { renderFilterableListItem } from '../FilterableList/utils/renderFilterableListItem';
import { ListItem } from '../ListItem';
import { selectBaseFactory } from '../SelectBase';
import { useSelect } from './useSelect';

const COMPONENT_NAME = 'Select';

const SelectBase = selectBaseFactory<IFilterableListItem>();

export const Select = componentFactory<ISelectFactory>(
  (props, forwardedRef) => {
    const {
      getValueFieldProps,
      value,
      defaultValue,
      onChange,
      noResultsLabel,
      ...other
    } = useProps({ componentName: COMPONENT_NAME, props });

    const { defaultItem, selectedItem } = useSelect({
      items: other.items,
      itemEmpty: isFilterableListItemEmpty,
      defaultValue,
      value,
    });

    return (
      <SelectBase
        itemsEqual={areFilterableListItemsEqual}
        itemEmpty={isFilterableListItemEmpty}
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
        getValueFieldProps={(renderProps, selectedItem) => ({
          leadingIcon: selectedItem?.icon,
          ...getValueFieldProps?.(renderProps, selectedItem),
        })}
        defaultItem={defaultItem}
        selectedItem={selectedItem}
        onItemChange={(item) => onChange?.(item?.value)}
        leadingIcon={selectedItem?.icon}
        ref={forwardedRef}
      />
    );
  },
);

Select.displayName = `@sixui/${COMPONENT_NAME}`;
