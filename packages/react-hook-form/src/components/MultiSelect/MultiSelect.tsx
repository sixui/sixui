import { MultiSelect as $MultiSelect } from '@sixui/core';

import { formFieldFactory } from '~/utils/formFieldFactory';

export const MultiSelect = formFieldFactory($MultiSelect, {
  emptyValue: [],
});

export type IMultiSelectProps = React.ComponentProps<typeof MultiSelect>;
