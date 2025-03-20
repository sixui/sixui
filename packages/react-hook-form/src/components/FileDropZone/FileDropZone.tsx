import type { IFileDropZoneFactory, IOmit } from '@sixui/core';
import type { FieldValues, UseControllerProps } from 'react-hook-form';
import { FileDropZone as $FileDropZone } from '@sixui/core';

import { useFormField } from '~/hooks/useFormField';

export type IFileDropZoneProps<TFieldValues extends FieldValues> =
  UseControllerProps<TFieldValues> &
    IOmit<IFileDropZoneFactory['props'], 'value' | 'defaultValue'> & {
      ref?: IFileDropZoneFactory['ref'];
    };

type IFileDropZone = (<TFieldValues extends FieldValues>(
  props: IFileDropZoneProps<TFieldValues>,
) => React.JSX.Element) &
  IFileDropZoneFactory['staticComponents'];

export const FileDropZone: IFileDropZone = <TFieldValues extends FieldValues>(
  props: IFileDropZoneProps<TFieldValues>,
) => {
  const formFieldProps = useFormField<
    TFieldValues,
    IFileDropZoneFactory['props'],
    Parameters<NonNullable<IFileDropZoneFactory['props']['onChange']>>
  >(props, {
    emptyValue: [],
  });

  return <$FileDropZone {...formFieldProps} />;
};

FileDropZone.FileCard = $FileDropZone.FileCard;
FileDropZone.Control = $FileDropZone.Control;
