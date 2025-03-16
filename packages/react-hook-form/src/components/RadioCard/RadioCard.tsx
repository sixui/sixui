import { RadioCard as $RadioCard } from '@sixui/core';

import { formCheckableFieldFactory } from '~/utils/formFieldFactory';

export const RadioCard = formCheckableFieldFactory($RadioCard);

export type IRadioCardProps = React.ComponentProps<typeof RadioCard>;
