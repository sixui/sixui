import { Sortable as $Sortable } from '@sixui/core';

import { formFieldFactory } from '~/utils/formFieldFactory';

export const Sortable = formFieldFactory($Sortable, {
  emptyValue: [],
});

export type ISortableProps = React.ComponentProps<typeof Sortable>;
