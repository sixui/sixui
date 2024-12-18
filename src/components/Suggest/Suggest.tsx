import type { IFilterableListItem } from '../FilterableList';
import type { ISuggestFactory } from './Suggest.types';
import { componentFactory } from '~/utils/component/componentFactory';
import { useProps } from '~/utils/component/useProps';
import { areFilterableListItemsEqual } from '../FilterableList/utils/areFilterableListItemsEqual';
import { filterFilterableList } from '../FilterableList/utils/filterFilterableList';
import { getFilterableListItemLabel } from '../FilterableList/utils/getFilterableListItemLabel';
import { isFilterableListItemDisabled } from '../FilterableList/utils/isFilterableListItemDisabled';
import { isFilterableListItemEmpty } from '../FilterableList/utils/isFilterableListItemEmpty';
import { renderFilterableListItem } from '../FilterableList/utils/renderFilterableListItem';
import { ListItem } from '../ListItem';
import { useSelect } from '../Select/useSelect';
import { suggestBaseFactory } from '../SuggestBase';

const COMPONENT_NAME = 'Suggest';

const SuggestBase = suggestBaseFactory<IFilterableListItem>();

export const Suggest = componentFactory<ISuggestFactory>(
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
      <SuggestBase
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
          leadingIcon:
            renderProps.hasFocus && renderProps.query
              ? undefined
              : selectedItem?.icon,
          ...getValueFieldProps?.(renderProps, selectedItem),
        })}
        defaultItem={defaultItem}
        selectedItem={selectedItem}
        onItemChange={(item) => onChange?.(item?.value)}
        ref={forwardedRef}
      />
    );
  },
);

Suggest.displayName = `@sixui/${COMPONENT_NAME}`;
