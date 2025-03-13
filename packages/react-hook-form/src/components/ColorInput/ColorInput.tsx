import type { IColorInputProps as $IColorInputProps } from '@sixui/core';
import { ColorInput as $ColorInput } from '@sixui/core';

import { formFieldFactory } from '~/utils/formFieldFactory';

export const ColorInput = formFieldFactory<$IColorInputProps>($ColorInput);

export type IColorInputProps = React.ComponentProps<typeof ColorInput>;
