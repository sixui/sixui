import type { ISuggestFactory } from '@sixui/core';
import type { FieldValues } from 'react-hook-form';
import { Suggest as $Suggest } from '@sixui/core';

import type { IFormComponentPropsFactory } from '~/utils/types';
import { useFormField } from '~/hooks/useFormField';

export type ISuggestProps<TFieldValues extends FieldValues> =
  IFormComponentPropsFactory<
    ISuggestFactory,
    TFieldValues,
    'value' | 'defaultValue'
  >;

type ISuggest = (<TFieldValues extends FieldValues>(
  props: ISuggestProps<TFieldValues>,
) => React.JSX.Element) &
  ISuggestFactory['staticComponents'];

export const Suggest: ISuggest = <TFieldValues extends FieldValues>(
  props: ISuggestProps<TFieldValues>,
) => {
  const formFieldProps = useFormField<
    TFieldValues,
    ISuggestFactory['props'],
    Parameters<NonNullable<ISuggestFactory['props']['onChange']>>
  >(props);

  return <$Suggest {...formFieldProps} />;
};

Suggest.Control = $Suggest.Control;
