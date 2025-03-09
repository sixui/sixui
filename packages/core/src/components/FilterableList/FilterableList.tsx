import type {
  IFilterableListFactory,
  IFilterableListItem,
} from './FilterableList.types';
import { filterableListBaseFactory } from '~/components/FilterableListBase';
import { ListItem } from '~/components/List/ListItem';
import { MenuList } from '~/components/Menu/MenuList';
import { TextInput } from '~/components/TextInput';
import { useProps } from '~/components/Theme';
import { polymorphicComponentFactory } from '~/utils/component/polymorphicComponentFactory';
import { COMPONENT_NAME } from './FilterableList.constants';
import { areFilterableListItemsEqual } from './utils/areFilterableListItemsEqual';
import { filterFilterableList } from './utils/filterFilterableList';
import { renderFilterableListItem } from './utils/renderFilterableListItem';

const FilterableListBase = filterableListBaseFactory<IFilterableListItem>();

export const FilterableList =
  polymorphicComponentFactory<IFilterableListFactory>((props, forwardedRef) => {
    const { canFilter, ...other } = useProps({
      componentName: COMPONENT_NAME,
      props,
    });

    return (
      <FilterableListBase
        renderer={(listProps) => (
          <MenuList
            header={
              canFilter ? (
                <TextInput
                  onChange={(event) => {
                    listProps.handleQueryChange(event.target.value);
                  }}
                  value={listProps.query}
                  disabled={listProps.disabled}
                  clearable
                />
              ) : undefined
            }
          >
            {listProps.filteredList}
          </MenuList>
        )}
        itemRenderer={renderFilterableListItem}
        itemsEqual={areFilterableListItemsEqual}
        listPredicate={filterFilterableList}
        noResults={<ListItem disabled>No results.</ListItem>}
        ref={forwardedRef}
        {...other}
      />
    );
  });

FilterableList.displayName = `@sixui/core/${COMPONENT_NAME}`;
