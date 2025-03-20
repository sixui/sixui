import type { IOmit, ISearchBarFactory } from '@sixui/core';
import type { FieldValues, UseControllerProps } from 'react-hook-form';
import { SearchBar as $SearchBar } from '@sixui/core';

import { useFormField } from '~/hooks/useFormField';

export type ISearchBarProps<TFieldValues extends FieldValues> =
  UseControllerProps<TFieldValues> &
    IOmit<ISearchBarFactory['props'], 'value' | 'defaultValue'> & {
      ref?: ISearchBarFactory['ref'];
    };

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
