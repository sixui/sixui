import type { IFilterableListItem } from '~/components/FilterableList';
import type { ISelectControlFactory } from './SelectControl.types';
import { areFilterableListItemsEqual } from '~/components/FilterableList/utils/areFilterableListItemsEqual';
import { filterFilterableList } from '~/components/FilterableList/utils/filterFilterableList';
import { getFilterableListItemLabel } from '~/components/FilterableList/utils/getFilterableListItemLabel';
import { isFilterableListItemDisabled } from '~/components/FilterableList/utils/isFilterableListItemDisabled';
import { isFilterableListItemEmpty } from '~/components/FilterableList/utils/isFilterableListItemEmpty';
import { renderFilterableListItem } from '~/components/FilterableList/utils/renderFilterableListItem';
import { ListItem } from '~/components/List/ListItem';
import { selectBaseFactory } from '~/components/SelectBase';
import { useProps } from '~/components/Theme';
import { useSelect } from '~/hooks/useSelect';
import { componentFactory } from '~/utils/component/componentFactory';
import { COMPONENT_NAME } from './SelectControl.constants';
import { selectControlTheme } from './SelectControl.css';

const SelectBase = selectBaseFactory<IFilterableListItem>();

export const SelectControl = componentFactory<ISelectControlFactory>(
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

SelectControl.displayName = `@sixui/core/${COMPONENT_NAME}`;
SelectControl.theme = selectControlTheme;
