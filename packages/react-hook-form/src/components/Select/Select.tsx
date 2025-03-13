import { Select as $Select } from '@sixui/core';

import { formFieldFactory } from '~/utils/formFieldFactory';

export const Select = formFieldFactory($Select);

export type ISelectProps = React.ComponentProps<typeof Select>;
