import { forwardRef } from 'react';

import type { ISuggestionChipProps } from './SuggestionChip.types';
import { createPolymorphicComponent } from '~/helpers/react/polymorphicComponentTypes';
import { Chip } from './Chip';

export const SuggestionChip = createPolymorphicComponent<
  'div',
  ISuggestionChipProps
>(
  forwardRef<HTMLDivElement, ISuggestionChipProps>(
    function SuggestionChip(props, forwardedRef) {
      return <Chip {...props} ref={forwardedRef} variant='suggestion' />;
    },
  ),
);
