import { forwardRef } from 'react';

import type { IFilterChipProps } from './FilterChip.types';
import { createPolymorphicComponent } from '~/utils/component/createPolymorphicComponent';
import { Chip } from './Chip';

/**
 * @see https://m3.material.io/components/chips/overview
 */
export const FilterChip = createPolymorphicComponent<'div', IFilterChipProps>(
  forwardRef<HTMLButtonElement, IFilterChipProps>(
    function FilterChip(props, forwardedRef) {
      return (
        <Chip
          {...props}
          ref={forwardedRef}
          variant="filter"
          animatedLeadingIconSlot
        />
      );
    },
  ),
);
