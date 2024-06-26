import {
  FloatingQueryList,
  type IFloatingQueryListProps,
} from './FloatingQueryList';

import { ReactComponent as TriangleDownIcon } from '@/assets/TriangleDown.svg';
import { ReactComponent as TriangleUpIcon } from '@/assets/TriangleUp.svg';
import { ListItem } from '@/components/atoms/ListItem';
import { TextField } from '@/components/atoms/TextField';
import { MenuList } from '@/components/atoms/MenuList';
import { Field } from '../Field';
import {
  areFilmsEqual,
  createFilm,
  filterFilm,
  isFilmDisabled,
  renderCreateFilmMenuItem,
  renderFilm,
  TOP_100_FILMS,
  type IFilm,
} from './films';

export type IFloatingQueryListDemoProps = IFloatingQueryListProps<IFilm>;

export const FloatingQueryListDemo: React.FC<IFloatingQueryListDemoProps> = (
  props,
) => {
  const canFilter = true;

  return (
    <FloatingQueryList<IFilm>
      {...props}
      items={TOP_100_FILMS}
      renderer={(listProps) => (
        <MenuList
          header={
            canFilter ? (
              <TextField
                onChange={listProps.handleQueryChange}
                value={listProps.query}
                disabled={listProps.disabled}
                clearable
                {...listProps.inputFilterAttributes}
                ref={listProps.inputFilterRef}
              />
            ) : undefined
          }
        >
          {listProps.itemList}
        </MenuList>
      )}
      itemRenderer={renderFilm}
      itemsEqual={areFilmsEqual}
      itemPredicate={canFilter ? filterFilm : undefined}
      noResults={<ListItem disabled>No results.</ListItem>}
      createNewItemFromQuery={createFilm}
      createNewItemRenderer={renderCreateFilmMenuItem}
      itemDisabled={isFilmDisabled}
      fill
    >
      {(buttonProps) => (
        <Field
          as='button'
          placeholder='Choose a film'
          end={
            buttonProps.isOpen ? (
              <TriangleUpIcon aria-hidden />
            ) : (
              <TriangleDownIcon aria-hidden />
            )
          }
          variant='outlined'
          {...buttonProps.buttonAttributes}
          ref={buttonProps.buttonRef}
        >
          {buttonProps.selectedItem?.title}
        </Field>
      )}
    </FloatingQueryList>
  );
};
