import { TextArea as $TextArea } from '@sixui/core';

import { formFieldFactory } from '~/utils/formFieldFactory';

export const TextArea = formFieldFactory($TextArea);

export type ITextAreaProps = React.ComponentProps<typeof TextArea>;
