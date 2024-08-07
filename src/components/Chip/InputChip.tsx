import { forwardRef } from 'react';

import type { IInputChipProps } from './InputChip.types';
import { createPolymorphicComponent } from '~/helpers/react/polymorphicComponentTypes';
import { Chip } from './Chip';

export const InputChip = createPolymorphicComponent<'div', IInputChipProps>(
  forwardRef<HTMLDivElement, IInputChipProps>(
    function InputChip(props, forwardedRef) {
      return <Chip {...props} ref={forwardedRef} variant='input' />;
    },
  ),
);
