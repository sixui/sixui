import { Switch as $Switch } from '@sixui/core';

import { formCheckableFieldFactory } from '~/utils/formFieldFactory';

export const Switch = formCheckableFieldFactory($Switch);

export type ISwitchProps = React.ComponentProps<typeof Switch>;
