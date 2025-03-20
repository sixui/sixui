import type { IFileDropZoneFactory } from '@sixui/core';
import type { FieldValues } from 'react-hook-form';
import { FileDropZone as $FileDropZone } from '@sixui/core';

import type { IFormComponentPropsFactory } from '~/utils/types';
import { useFormField } from '~/hooks/useFormField';

export type IFileDropZoneProps<TFieldValues extends FieldValues> =
  IFormComponentPropsFactory<
    IFileDropZoneFactory,
    TFieldValues,
    'value' | 'defaultValue'
  >;

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
