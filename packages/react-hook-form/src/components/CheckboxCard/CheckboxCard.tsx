import { CheckboxCard as $CheckboxCard } from '@sixui/core';

import { formCheckableFieldFactory } from '~/utils/formFieldFactory';

export const CheckboxCard = formCheckableFieldFactory($CheckboxCard);

export type ICheckboxCardProps = React.ComponentProps<typeof CheckboxCard>;
