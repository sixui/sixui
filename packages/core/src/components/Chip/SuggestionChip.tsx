import { forwardRef } from 'react';

import type { ISuggestionChipProps } from './SuggestionChip.types';
import { createPolymorphicComponent } from '~/utils/component/createPolymorphicComponent';
import { Chip } from './Chip';

/**
 * @see https://m3.material.io/components/chips/overview
 */
export const SuggestionChip = createPolymorphicComponent<
  'div',
  ISuggestionChipProps
>(
  forwardRef<HTMLButtonElement, ISuggestionChipProps>(
    function SuggestionChip(props, forwardedRef) {
      return <Chip {...props} ref={forwardedRef} variant="suggestion" />;
    },
  ),
);
