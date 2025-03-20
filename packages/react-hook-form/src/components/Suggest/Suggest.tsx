import type { IOmit, ISuggestFactory } from '@sixui/core';
import type { FieldValues, UseControllerProps } from 'react-hook-form';
import { Suggest as $Suggest } from '@sixui/core';

import { useFormField } from '~/hooks/useFormField';

export type ISuggestProps<TFieldValues extends FieldValues> =
  UseControllerProps<TFieldValues> &
    IOmit<ISuggestFactory['props'], 'value' | 'defaultValue'> & {
      ref?: ISuggestFactory['ref'];
    };

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
