import { CheckboxGroup as $CheckboxGroup } from '@sixui/core';

import { formFieldFactory } from '~/utils/formFieldFactory';

export const CheckboxGroup = formFieldFactory($CheckboxGroup, {
  emptyValue: [],
});

CheckboxGroup.Item = $CheckboxGroup.Item;
CheckboxGroup.Card = $CheckboxGroup.Card;

export type ICheckboxGroupProps = React.ComponentProps<typeof CheckboxGroup>;
