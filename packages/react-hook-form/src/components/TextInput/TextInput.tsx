import { TextInput as $TextInput } from '@sixui/core';

import { formFieldFactory } from '~/utils/formFieldFactory';

export const TextInput = formFieldFactory($TextInput);

export type ITextInputProps = React.ComponentProps<typeof TextInput>;
