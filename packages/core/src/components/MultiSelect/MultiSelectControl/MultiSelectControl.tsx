import { asArray } from '@olivierpascal/helpers';

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
import { classNames, multiSelectControlTheme } from './MultiSelectControl.css';

const MultiSelectBase = multiSelectBaseFactory<IFilterableListItem>();

export const MultiSelectControl = componentFactory<IMultiSelectControlFactory>(
  (props, forwardedRef) => {
    const {
      id,
      name,
      getValueFieldProps,
      value: valueProp,
      defaultValue,
      onChange,
      noResultsLabel,
      ...other
    } = useProps({ componentName: COMPONENT_NAME, props });

    const { defaultItems, selectedItems, onItemsChange, value } =
      useMultiSelect({
        items: other.items,
        defaultValue,
        value: valueProp,
        onChange,
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
        id={id}
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
        onItemsChange={onItemsChange}
        ref={forwardedRef}
      >
        <input
          className={classNames.input}
          aria-invalid="false"
          aria-hidden="true"
          inert
          name={name}
          tabIndex={-1}
          value={asArray(value).join(',')}
          readOnly
        />
      </MultiSelectBase>
    );
  },
);

MultiSelectControl.displayName = `@sixui/core/${COMPONENT_NAME}`;
MultiSelectControl.theme = multiSelectControlTheme;
