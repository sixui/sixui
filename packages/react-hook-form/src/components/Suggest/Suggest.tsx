import { Suggest as $Suggest } from '@sixui/core';

import { formFieldFactory } from '~/utils/formFieldFactory';

export const Suggest = formFieldFactory($Suggest, {
  emptyValue: [],
});

export type ISuggestProps = React.ComponentProps<typeof Suggest>;
