import { Checkbox as $Checkbox } from '@sixui/core';

import { formCheckableFieldFactory } from '~/utils/formFieldFactory';

export const Checkbox = formCheckableFieldFactory($Checkbox);

export type ICheckboxProps = React.ComponentProps<typeof Checkbox>;
