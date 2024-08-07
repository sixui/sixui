import { forwardRef } from 'react';

import type { IAssistChipProps } from './AssistChip.types';
import { createPolymorphicComponent } from '~/helpers/react/polymorphicComponentTypes';
import { Chip } from './Chip';

export const AssistChip = createPolymorphicComponent<'div', IAssistChipProps>(
  forwardRef<HTMLDivElement, IAssistChipProps>(
    function AssistChip(props, forwardedRef) {
      return <Chip {...props} ref={forwardedRef} variant='assist' />;
    },
  ),
);
