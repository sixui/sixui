import { forwardRef } from 'react';

import type { IAssistChipProps } from './AssistChip.types';
import { createPolymorphicComponent } from '~/utils/component/createPolymorphicComponent';
import { Chip } from './Chip';

/**
 * @see https://m3.material.io/components/chips/overview
 */
export const AssistChip = createPolymorphicComponent<'div', IAssistChipProps>(
  forwardRef<HTMLButtonElement, IAssistChipProps>(
    function AssistChip(props, forwardedRef) {
      return <Chip {...props} ref={forwardedRef} variant="assist" />;
    },
  ),
);
