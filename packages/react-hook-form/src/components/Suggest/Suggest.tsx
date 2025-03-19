import type { ISuggestProps as $ISuggestProps, IOmit } from '@sixui/core';
import type { FieldValues, UseControllerProps } from 'react-hook-form';
import { Suggest as $Suggest } from '@sixui/core';

import { useFormField } from '~/hooks/useFormField';

export type ISuggestProps<TFieldValues extends FieldValues> =
  UseControllerProps<TFieldValues> &
    IOmit<$ISuggestProps, 'value' | 'defaultValue'>;

type ISuggest = <TFieldValues extends FieldValues>(
  props: ISuggestProps<TFieldValues>,
) => React.JSX.Element;

export const Suggest: ISuggest = <TFieldValues extends FieldValues>(
  props: ISuggestProps<TFieldValues>,
) => {
  const formFieldProps = useFormField<
    TFieldValues,
    $ISuggestProps,
    Parameters<NonNullable<$ISuggestProps['onChange']>>
  >(props);

  return <$Suggest {...formFieldProps} />;
};
