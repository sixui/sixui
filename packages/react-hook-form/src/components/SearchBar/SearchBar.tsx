import type { ISearchBarProps as $ISearchBarProps, IOmit } from '@sixui/core';
import type { FieldValues, UseControllerProps } from 'react-hook-form';
import { SearchBar as $SearchBar } from '@sixui/core';

import { useFormField } from '~/hooks/useFormField';

export type ISearchBarProps<TFieldValues extends FieldValues> =
  UseControllerProps<TFieldValues> &
    IOmit<$ISearchBarProps, 'value' | 'defaultValue'>;

type ISearchBarStaticComponents = {
  Item: typeof $SearchBar.Item;
  Card: typeof $SearchBar.Card;
};

type ISearchBar = (<TFieldValues extends FieldValues>(
  props: ISearchBarProps<TFieldValues>,
) => React.JSX.Element) &
  ISearchBarStaticComponents;

export const SearchBar: ISearchBar = <TFieldValues extends FieldValues>(
  props: ISearchBarProps<TFieldValues>,
) => {
  const formFieldProps = useFormField<
    TFieldValues,
    $ISearchBarProps,
    Parameters<NonNullable<$ISearchBarProps['onChange']>>
  >(props, {
    supportsErrorProps: false,
  });

  return <$SearchBar {...formFieldProps} />;
};

SearchBar.Item = $SearchBar.Item;
SearchBar.Card = $SearchBar.Card;
