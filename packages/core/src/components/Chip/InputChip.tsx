import { forwardRef } from 'react';

import type { IInputChipProps } from './InputChip.types';
import { createPolymorphicComponent } from '~/utils/component/createPolymorphicComponent';
import { Chip } from './Chip';

/**
 * @see https://m3.material.io/components/chips/overview
 */
export const InputChip = createPolymorphicComponent<'div', IInputChipProps>(
  forwardRef<HTMLButtonElement, IInputChipProps>(
    function InputChip(props, forwardedRef) {
      return <Chip {...props} ref={forwardedRef} variant="input" />;
    },
  ),
);
