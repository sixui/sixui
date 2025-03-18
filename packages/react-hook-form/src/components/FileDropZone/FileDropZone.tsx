import { FileDropZone as $FileDropZone } from '@sixui/core';

import { formFieldFactory } from '~/utils/formFieldFactory';

export const FileDropZone = formFieldFactory($FileDropZone, {
  emptyValue: [],
});

export type IFileDropZoneProps = React.ComponentProps<typeof FileDropZone>;
