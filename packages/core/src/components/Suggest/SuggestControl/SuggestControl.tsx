import type { IFilterableListItem } from '~/components/FilterableList';
import type { ISuggestControlFactory } from './SuggestControl.types';
import { FieldBaseSkeleton } from '~/components/FieldBase';
import { areFilterableListItemsEqual } from '~/components/FilterableList/utils/areFilterableListItemsEqual';
import { filterFilterableList } from '~/components/FilterableList/utils/filterFilterableList';
import { getFilterableListItemLabel } from '~/components/FilterableList/utils/getFilterableListItemLabel';
import { isFilterableListItemDisabled } from '~/components/FilterableList/utils/isFilterableListItemDisabled';
import { isFilterableListItemEmpty } from '~/components/FilterableList/utils/isFilterableListItemEmpty';
import { renderFilterableListItem } from '~/components/FilterableList/utils/renderFilterableListItem';
import { ListItem } from '~/components/List/ListItem';
import { suggestBaseFactory } from '~/components/SuggestBase';
import { useProps } from '~/components/Theme';
import { useSelect } from '~/hooks/useSelect';
import { componentFactory } from '~/utils/component/componentFactory';
import { COMPONENT_NAME } from './SuggestControl.constants';
import { classNames, suggestControlTheme } from './SuggestControl.css';

const SuggestBase = suggestBaseFactory<IFilterableListItem>();

export const SuggestControl = componentFactory<ISuggestControlFactory>(
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

    const { defaultItem, selectedItem, onItemChange, value } = useSelect({
      items: other.items,
      itemEmpty: isFilterableListItemEmpty,
      defaultValue,
      value: valueProp,
      onChange,
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
        onItemChange={onItemChange}
        ref={forwardedRef}
      >
        <input
          className={classNames.input}
          aria-invalid="false"
          aria-hidden="true"
          inert
          id={id}
          name={name}
          tabIndex={-1}
          value={value ?? ''}
          readOnly
        />
      </SuggestBase>
    );
  },
);

SuggestControl.displayName = `@sixui/core/${COMPONENT_NAME}`;
SuggestControl.theme = suggestControlTheme;
SuggestControl.Skeleton = FieldBaseSkeleton;
