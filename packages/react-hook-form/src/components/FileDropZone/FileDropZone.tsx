import type {
  IFileDropZoneProps as $IFileDropZoneProps,
  IOmit,
} from '@sixui/core';
import type { FieldValues, UseControllerProps } from 'react-hook-form';
import { FileDropZone as $FileDropZone } from '@sixui/core';

import { useFormField } from '~/hooks/useFormField';

export type IFileDropZoneProps<TFieldValues extends FieldValues> =
  UseControllerProps<TFieldValues> &
    IOmit<$IFileDropZoneProps, 'value' | 'defaultValue'>;

type IFileDropZone = <TFieldValues extends FieldValues>(
  props: IFileDropZoneProps<TFieldValues>,
) => React.JSX.Element;

export const FileDropZone: IFileDropZone = <TFieldValues extends FieldValues>(
  props: IFileDropZoneProps<TFieldValues>,
) => {
  const formFieldProps = useFormField<
    TFieldValues,
    $IFileDropZoneProps,
    Parameters<NonNullable<$IFileDropZoneProps['onChange']>>
  >(props, {
    emptyValue: [],
  });

  return <$FileDropZone {...formFieldProps} />;
};
