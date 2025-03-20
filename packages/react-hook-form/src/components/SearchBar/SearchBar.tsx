import type { ISearchBarFactory } from '@sixui/core';
import type { FieldValues } from 'react-hook-form';
import { SearchBar as $SearchBar } from '@sixui/core';

import type { IFormComponentPropsFactory } from '~/utils/types';
import { useFormField } from '~/hooks/useFormField';

export type ISearchBarProps<TFieldValues extends FieldValues> =
  IFormComponentPropsFactory<
    ISearchBarFactory,
    TFieldValues,
    'value' | 'defaultValue'
  >;

type ISearchBar = <TFieldValues extends FieldValues>(
  props: ISearchBarProps<TFieldValues>,
) => React.JSX.Element;

export const SearchBar: ISearchBar = <TFieldValues extends FieldValues>(
  props: ISearchBarProps<TFieldValues>,
) => {
  const formFieldProps = useFormField<
    TFieldValues,
    ISearchBarFactory['props'],
    Parameters<NonNullable<ISearchBarFactory['props']['onChange']>>
  >(props, {
    supportsErrorProps: false,
  });

  return <$SearchBar {...formFieldProps} />;
};
