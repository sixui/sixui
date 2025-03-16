import { NativeSelect as $NativeSelect } from '@sixui/core';

import { formFieldFactory } from '~/utils/formFieldFactory';

export const NativeSelect = formFieldFactory($NativeSelect);

export type INativeSelectProps = React.ComponentProps<typeof NativeSelect>;
