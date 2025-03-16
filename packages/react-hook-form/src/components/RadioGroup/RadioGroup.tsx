import { RadioGroup as $RadioGroup } from '@sixui/core';

import { formCheckableFieldFactory } from '~/utils/formFieldFactory';

export const RadioGroup = formCheckableFieldFactory($RadioGroup);
RadioGroup.Item = $RadioGroup.Item;
RadioGroup.Card = $RadioGroup.Card;

export type IRadioGroupProps = React.ComponentProps<typeof RadioGroup>;
