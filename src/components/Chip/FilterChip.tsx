import { forwardRef } from 'react';

import type { IFilterChipProps } from './FilterChip.types';
import { createPolymorphicComponent } from '~/helpers/react/polymorphicComponentTypes';
import { Chip } from './Chip';

export const FilterChip = createPolymorphicComponent<'div', IFilterChipProps>(
  forwardRef<HTMLDivElement, IFilterChipProps>(
    function FilterChip(props, forwardedRef) {
      return <Chip {...props} ref={forwardedRef} variant='filter' />;
    },
  ),
);
